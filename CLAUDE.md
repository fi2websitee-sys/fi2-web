# FI2 Website - Claude Code Configuration

## Project Overview

Faculty of Information II (FI2) Student Committee website for Lebanese University.

**Technology Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- Vercel deployment

**Repository**: https://github.com/fi2websitee-sys/fi2-web

---

## Supabase Configuration

### Environment Variables

**⚠️ IMPORTANT**: These credentials should be stored in environment variables, not committed to git.

```env
# Supabase Public Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xmtxnwhktwcflixbgruv.supabase.co

# Supabase Keys (Store securely in .env.local - DO NOT COMMIT)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdHhud2hrdHdjZmxpeGJncnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDg4MDYsImV4cCI6MjA4NTk4NDgwNn0.460Z0S1Kkrh48PMhZdPbX6C_Ffb20DJiGptQgl4Rxn0

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdHhud2hrdHdjZmxpeGJncnV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQwODgwNiwiZXhwIjoyMDg1OTg0ODA2fQ.VnnLCgT0N1NvKhV3wNcHQRzrY_lVRzIqDTPkK0tFrPE
```

### PostgreSQL Connection Details

```
Host: db.xmtxnwhktwcflixbgruv.supabase.co
Database: postgres
User: postgres.xmtxnwhktwcflixbgruv
Password: bu1GkXGmOsdSg8UG

# Connection Pooler (Recommended for serverless)
Connection String (Pooler):
postgres://postgres.xmtxnwhktwcflixbgruv:bu1GkXGmOsdSg8UG@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true

# Direct Connection
Connection String (Direct):
postgres://postgres.xmtxnwhktwcflixbgruv:bu1GkXGmOsdSg8UG@aws-1-eu-north-1.pooler.supabase.com:5432/postgres?sslmode=require
```

---

## Vercel Environment Variables Setup

### Steps to Configure

1. Go to: https://vercel.com/fi2websitee-sys/fi2-web/settings/environment-variables

2. Add the following variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xmtxnwhktwcflixbgruv.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (see above - starts with `eyJhbG...`) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | (see above - starts with `eyJhbG...`) | Production only (sensitive!) |

3. Redeploy:
   ```bash
   git push origin main
   # Or manually trigger deployment in Vercel dashboard
   ```

---

## Supabase MCP Server

The Supabase MCP server provides database operation tools for Claude Code.

### Installation

**Location**: `C:\Users\User\Projects\supabase-mcp-server`

```bash
cd C:\Users\User\Projects\supabase-mcp-server
npm install
npm run build
```

### Configuration in Claude Code

Add to `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "supabase": {
      "type": "stdio",
      "command": "node",
      "args": ["C:/Users/User/Projects/supabase-mcp-server/build/index.js"],
      "env": {
        "SUPABASE_URL": "https://xmtxnwhktwcflixbgruv.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdHhud2hrdHdjZmxpeGJncnV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQwODgwNiwiZXhwIjoyMDg1OTg0ODA2fQ.VnnLCgT0N1NvKhV3wNcHQRzrY_lVRzIqDTPkK0tFrPE"
      }
    }
  }
}
```

### Available MCP Tools

#### `db_query` - Query Tables
Query a Supabase table with optional filters and limit.

**Usage:**
```
Query all news items:
> db_query news_items

Query with limit:
> db_query users {limit: 10}

Query with filters:
> db_query contact_submissions {filters: {status: "new"}, limit: 5}
```

#### `db_insert` - Insert Records
Insert a new record into a table.

**Usage:**
```
Insert a contact submission:
> db_insert contact_submissions {
  name: "John Doe",
  email: "john@example.com",
  subject: "Inquiry",
  message: "Hello, I have a question",
  status: "new"
}
```

#### `db_update` - Update Records
Update an existing record by ID.

**Usage:**
```
Update contact status:
> db_update contact_submissions abc-123-def {status: "resolved"}

Update news item:
> db_update news_items xyz-789 {published: true}
```

#### `db_delete` - Delete Records
Delete a record by ID.

**Usage:**
```
Delete a contact submission:
> db_delete contact_submissions abc-123-def
```

#### `db_list_tables` - List All Tables
List all available tables in the database.

**Usage:**
```
> db_list_tables
```

### Available MCP Resources

#### `supabase://tables`
Returns a JSON list of all available tables.

**Usage:**
```
View tables:
> @supabase:supabase://tables
```

---

## Database Schema

### Tables

| Table | Description | Key Fields |
|-------|-------------|-----------|
| `admin_profiles` | Admin user roles and permissions | `id`, `role` (admin/super_admin) |
| `news_items` | News and announcements | `title`, `content`, `published`, `image_url` |
| `previous_exams` | Exam archive with filters | `course_name`, `major`, `year_level`, `semester`, `exam_type`, `file_url` |
| `entrance_exams` | Entrance exam records | `year`, `exam_type`, `file_url` |
| `contract_sheets` | Program contract sheets | `major`, `year_level`, `file_url` |
| `contact_submissions` | Contact form submissions | `name`, `email`, `subject`, `message`, `status` |

### Row-Level Security (RLS) Policies

All admin operations require:
1. Authenticated session via Supabase Auth
2. `admin_profiles.role` IN ('admin', 'super_admin')

Verified via PostgreSQL function: `is_admin(user_id UUID)`

**Public read access** (no auth required):
- `news_items` (WHERE published = true)
- `previous_exams`
- `entrance_exams`
- `contract_sheets`

**Admin-only access** (requires admin role):
- `contact_submissions` (read/update)
- All tables (insert/update/delete)

---

## Security Features

### Implemented Security Measures

✅ **Authentication & Authorization**
- Supabase Auth with JWT tokens
- Admin role verification on all admin routes
- RLS policies at database level

✅ **Input Validation**
- Zod schemas on all API endpoints
- XSS prevention via sanitization
- File upload validation (PDF only, 10MB max)

✅ **Rate Limiting**
- Login: 5 attempts / 15 minutes
- Contact form: 3 submissions / 1 hour
- In-memory implementation (suitable for single-instance)

✅ **Security Headers**
- Content Security Policy (CSP)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

✅ **Request Protection**
- Request size limits (1MB JSON, 10MB forms)
- DoS protection via rate limiting
- Secure logging (no sensitive data)

### OWASP Top 10 2021 Compliance

| Category | Status | Implementation |
|----------|--------|----------------|
| A01: Broken Access Control | ✅ Secure | RLS + middleware + API verification |
| A02: Cryptographic Failures | ✅ Secure | HSTS, Supabase password hashing |
| A03: Injection | ✅ Secure | Parameterized queries, Zod validation |
| A04: Insecure Design | ✅ Secure | Rate limiting, defense in depth |
| A05: Security Misconfiguration | ✅ Secure | Security headers, env vars |
| A06: Vulnerable Components | ✅ Current | Latest dependencies (2024) |
| A07: Auth Failures | ✅ Secure | Brute force protection, secure sessions |
| A08: Data Integrity | ✅ Secure | RLS policies, file validation |
| A09: Logging & Monitoring | ✅ Good | Secure logger utility |
| A10: SSRF | ✅ N/A | No user-controlled URLs |

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Description of changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request on GitHub
gh pr create --title "Feature: Your feature" --body "Description"
```

### Deployment

Automatic deployment via Vercel on push to `main` branch:

1. Push to GitHub: `git push origin main`
2. Vercel automatically builds and deploys
3. Check deployment status: https://vercel.com/fi2websitee-sys/fi2-web
4. Live site updates within 1-2 minutes

---

## Common Tasks

### Add Admin User

```sql
-- Run in Supabase SQL Editor
INSERT INTO admin_profiles (id, role)
VALUES ('user-uuid-from-auth-users', 'admin');
```

### Reset Contact Form Submissions

```sql
-- Clear old submissions (older than 30 days)
DELETE FROM contact_submissions
WHERE created_at < NOW() - INTERVAL '30 days';
```

### View RLS Policies

```sql
-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

---

## Troubleshooting

### Build Failures

**Error: Supabase URL/Key not found during build**
- Cause: Client pages being prerendered without environment variables
- Solution: Added `export const dynamic = 'force-dynamic';` to client pages

**TypeScript Errors**
- Run: `npm run build` to see all errors
- Check imports and type definitions
- Verify environment variable types

### Supabase Connection Issues

**Error: Invalid JWT**
- Check that `SUPABASE_ANON_KEY` is correct
- Verify key hasn't expired (expires 2085)

**RLS Policy Blocking Request**
- Verify user is authenticated
- Check admin_profiles table for user's role
- Review RLS policies with `is_admin()` function

### MCP Server Issues

**Server won't start**
```bash
# Check environment variables
echo $SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY

# Test connection
curl -H "apikey: YOUR_SERVICE_KEY" \
  https://xmtxnwhktwcflixbgruv.supabase.co/rest/v1/
```

**Tools not appearing in Claude Code**
- Verify `.mcp.json` configuration
- Check MCP server build: `npm run build`
- Restart Claude Code after configuration changes
- Run `/mcp` in Claude Code to see connected servers

---

## Security Best Practices

### DO ✅

- Store credentials in `.env.local` (gitignored)
- Use environment variables in Vercel for production
- Rotate API keys regularly
- Review RLS policies before deployment
- Test authentication flows before releasing
- Monitor rate limiting effectiveness
- Keep dependencies updated

### DON'T ❌

- Commit `.env.local` or credentials to git
- Use `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Bypass RLS policies without security review
- Disable rate limiting in production
- Skip input validation
- Log sensitive user data
- Share admin credentials

---

## Resources

- **Supabase Dashboard**: https://supabase.com/dashboard/project/xmtxnwhktwcflixbgruv
- **Vercel Dashboard**: https://vercel.com/fi2websitee-sys/fi2-web
- **GitHub Repository**: https://github.com/fi2websitee-sys/fi2-web
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **MCP Documentation**: https://modelcontextprotocol.io

---

## License

MIT
