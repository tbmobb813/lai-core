// Message storage
import Database from 'better-sqlite3';
import type { Message } from '../types';
import { randomBytes } from 'crypto';

function generateId(): string {
  return randomBytes(16).toString('hex');
}

export class MessageStore {
  private db: Database.Database;

  constructor(storagePath: string = './data/lai.db') {
    this.db = new Database(storagePath);
    this.initTables();
  }

  private initTables(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        tokens_used INTEGER,
        context TEXT,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_messages_conversation 
        ON messages(conversation_id, timestamp);

      CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts 
        USING fts5(id, content, content='messages', content_rowid='rowid');

      CREATE TRIGGER IF NOT EXISTS messages_ai AFTER INSERT ON messages BEGIN
        INSERT INTO messages_fts(id, content) VALUES (new.id, new.content);
      END;

      CREATE TRIGGER IF NOT EXISTS messages_au AFTER UPDATE ON messages BEGIN
        UPDATE messages_fts SET content = new.content WHERE id = old.id;
      END;

      CREATE TRIGGER IF NOT EXISTS messages_ad AFTER DELETE ON messages BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
      END;
    `);
  }

  async create(data: {
    conversationId: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
    tokensUsed?: number;
    context?: any;
  }): Promise<string> {
    const id = generateId();

    this.db
      .prepare(
        `INSERT INTO messages (id, conversation_id, role, content, timestamp, tokens_used, context)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        id,
        data.conversationId,
        data.role,
        data.content,
        data.timestamp,
        data.tokensUsed || null,
        JSON.stringify(data.context || null)
      );

    // Update conversation's updated_at
    this.db
      .prepare('UPDATE conversations SET updated_at = ? WHERE id = ?')
      .run(data.timestamp, data.conversationId);

    return id;
  }

  async get(id: string): Promise<Message> {
    const row = this.db
      .prepare('SELECT * FROM messages WHERE id = ?')
      .get(id) as any;

    if (!row) {
      throw new Error(`Message ${id} not found`);
    }

    return {
      id: row.id,
      conversationId: row.conversation_id,
      role: row.role,
      content: row.content,
      timestamp: row.timestamp,
      tokensUsed: row.tokens_used,
      context: row.context ? JSON.parse(row.context) : undefined,
    };
  }

  async getByConversation(conversationId: string): Promise<Message[]> {
    const rows = this.db
      .prepare(
        `SELECT * FROM messages 
         WHERE conversation_id = ? 
         ORDER BY timestamp ASC`
      )
      .all(conversationId) as any[];

    return rows.map(row => ({
      id: row.id,
      conversationId: row.conversation_id,
      role: row.role,
      content: row.content,
      timestamp: row.timestamp,
      tokensUsed: row.tokens_used,
      context: row.context ? JSON.parse(row.context) : undefined,
    }));
  }

  async delete(id: string): Promise<void> {
    this.db.prepare('DELETE FROM messages WHERE id = ?').run(id);
  }

  async deleteByConversation(conversationId: string): Promise<void> {
    this.db
      .prepare('DELETE FROM messages WHERE conversation_id = ?')
      .run(conversationId);
  }

  async search(query: string, conversationId?: string): Promise<Message[]> {
    let sql = `
      SELECT m.* FROM messages m
      JOIN messages_fts fts ON m.id = fts.id
      WHERE messages_fts MATCH ?
    `;
    const params: any[] = [query];

    if (conversationId) {
      sql += ' AND m.conversation_id = ?';
      params.push(conversationId);
    }

    sql += ' ORDER BY rank';

    const rows = this.db.prepare(sql).all(...params) as any[];

    return rows.map(row => ({
      id: row.id,
      conversationId: row.conversation_id,
      role: row.role,
      content: row.content,
      timestamp: row.timestamp,
      tokensUsed: row.tokens_used,
      context: row.context ? JSON.parse(row.context) : undefined,
    }));
  }

  close(): void {
    this.db.close();
  }
}
