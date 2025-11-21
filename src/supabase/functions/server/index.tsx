import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
import dataRoutes from "./dataRoutes.tsx";

// Check database table on server startup
const checkDatabaseTable = async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Quick check if table exists
    const { error } = await supabase
      .from("kv_store_5b21d3ea")
      .select("key")
      .limit(1);

    if (error && error.message.includes("does not exist")) {
      console.error("❌ Table kv_store_5b21d3ea does NOT exist!");
      console.log("📋 Please create it in Supabase Dashboard with this SQL:");
      console.log(`
CREATE TABLE IF NOT EXISTS public.kv_store_5b21d3ea (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_kv_store_5b21d3ea_key ON public.kv_store_5b21d3ea(key);
ALTER TABLE public.kv_store_5b21d3ea ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON public.kv_store_5b21d3ea FOR ALL TO service_role USING (true) WITH CHECK (true);
GRANT ALL ON public.kv_store_5b21d3ea TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kv_store_5b21d3ea TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kv_store_5b21d3ea TO authenticated;
      `);
      console.log("🔗 https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/sql/new");
    } else if (!error) {
      console.log("✅ Table kv_store_5b21d3ea exists and is accessible");
    }
  } catch (error) {
    console.error("Database check error:", error);
  }
};

// Run check (non-blocking)
checkDatabaseTable();

// Auto-initialize demo users on server startup
const initializeDemoUsers = async () => {
  try {
    console.log('🔄 Checking demo users...');
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Check if admin user exists
    const { data: users } = await supabase.auth.admin.listUsers();
    const adminExists = users?.users?.some(u => u.email === 'admin@talenttutor.com');
    
    if (!adminExists) {
      console.log('📦 Demo users not found. Creating them now...');
      // Make internal call to init-demo-data endpoint
      // Since we can't call ourselves, we'll just log the instruction
      console.log('⚠️  Please call POST /make-server-5b21d3ea/init-demo-data to create demo users');
    } else {
      console.log('✅ Demo users already exist');
    }
  } catch (error) {
    console.error('Demo users check error:', error);
  }
};

// Run demo users initialization (non-blocking)
initializeDemoUsers();

const app = new Hono();

// Startup message
console.log('='.repeat(60));
console.log('🚀 Talent Tutor Server Starting...');
console.log('='.repeat(60));

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ==================== HEALTH CHECK ====================

// Health check endpoint
app.get("/make-server-5b21d3ea/health", (c) => {
  return c.json({ 
    status: 'ok',
    message: 'Talent Tutor Server is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
app.get("/make-server-5b21d3ea/", (c) => {
  return c.json({ 
    message: 'Talent Tutor API Server',
    endpoints: [
      '/health',
      '/auth/register',
      '/auth/login',
      '/users',
      '/users/:userId',
      '/tickets'
    ]
  });
});

// ==================== DEMO DATA INITIALIZATION ====================

// Initialize demo data endpoint
app.post("/make-server-5b21d3ea/init-demo-data", async (c) => {
  try {
    console.log('📦 Initializing demo data with Supabase Auth...');
    
    // Create Supabase admin client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Demo users data - Real credentials for Talent Tutor
    const demoUsers = [
      {
        name: 'Admin User',
        email: 'admin@talenttutor.com',
        phone: '+8801700000001',
        password: 'Admin@2025',
        role: 'admin',
        address: 'Dhaka, Bangladesh',
        credits: 0,
        status: 'active',
        isProfileComplete: true,
        isVerified: true
      },
      {
        name: 'Teacher One',
        email: 'teacher1@talenttutor.com',
        phone: '+8801700000002',
        password: 'Teacher@2025',
        role: 'teacher',
        address: 'Dhaka, Bangladesh',
        credits: 50,
        status: 'active',
        isProfileComplete: true,
        isVerified: true
      },
      {
        name: 'Guardian One',
        email: 'guardian1@talenttutor.com',
        phone: '+8801700000003',
        password: 'Guardian@2025',
        role: 'guardian',
        address: 'Dhaka, Bangladesh',
        credits: 100,
        status: 'active',
        isProfileComplete: true,
        isVerified: true
      },
      {
        name: 'Student One',
        email: 'student1@talenttutor.com',
        phone: '+8801700000004',
        password: 'Student@2025',
        role: 'student',
        address: 'Dhaka, Bangladesh',
        credits: 0,
        status: 'active',
        isProfileComplete: false,
        isVerified: false
      },
      {
        name: 'Zakat Donor One',
        email: 'zakatdonor1@talenttutor.com',
        phone: '+8801700000005',
        password: 'Donor@2025',
        role: 'donor',
        donorType: 'zakat',
        address: 'Dhaka, Bangladesh',
        credits: 0,
        status: 'active',
        isProfileComplete: true,
        isVerified: true
      },
      {
        name: 'Material Donor One',
        email: 'materialdonor1@talenttutor.com',
        phone: '+8801700000006',
        password: 'Donor@2025',
        role: 'donor',
        donorType: 'materials',
        address: 'Dhaka, Bangladesh',
        credits: 0,
        status: 'active',
        isProfileComplete: true,
        isVerified: true
      }
    ];

    const createdUsers = [];

    // Create all users in Supabase Auth AND KV store
    for (const userData of demoUsers) {
      try {
        // Step 1: Create auth user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          email_confirm: true, // Auto-confirm email for demo
          user_metadata: {
            name: userData.name,
            phone: userData.phone,
            role: userData.role,
            address: userData.address,
            donorType: userData.donorType || null
          }
        });

        if (authError) {
          // If user already exists, that's okay - get their ID
          if (authError.message.includes('already registered')) {
            console.log(`⚠️ User ${userData.email} already exists, fetching...`);
            
            // Try to get existing user
            const { data: existingUsers } = await supabase.auth.admin.listUsers();
            const existingUser = existingUsers?.users?.find(u => u.email === userData.email);
            
            if (existingUser) {
              // Create profile with existing user ID
              const user = {
                id: existingUser.id,
                ...userData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };

              await kv.set(`user:${user.id}`, user);
              await kv.set(`user:email:${user.email}`, user.id);
              if (user.phone) {
                await kv.set(`user:phone:${user.phone}`, user.id);
              }

              createdUsers.push({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                credits: user.credits
              });

              console.log(`✅ Updated existing user: ${user.name} (${user.role})`);
              continue;
            }
          }
          
          console.error(`❌ Failed to create auth user ${userData.email}:`, authError);
          continue;
        }

        if (!authData.user) {
          console.error(`❌ No user data returned for ${userData.email}`);
          continue;
        }

        console.log(`✅ Supabase Auth user created: ${authData.user.id}`);

        // Step 2: Create user profile in KV store
        const user = {
          id: authData.user.id,
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Save user profile
        await kv.set(`user:${user.id}`, user);
      
        // Create email mapping
        if (user.email) {
          await kv.set(`user:email:${user.email}`, user.id);
        }
        
        // Create phone mapping
        if (user.phone) {
          await kv.set(`user:phone:${user.phone}`, user.id);
        }

        createdUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          credits: user.credits
        });

        console.log(`✅ Created demo user: ${user.name} (${user.role})`);

      } catch (userError) {
        console.error(`❌ Error creating user ${userData.email}:`, userError);
        continue;
      }
    }

    return c.json({
      success: true,
      message: 'Demo data initialized successfully',
      usersCreated: createdUsers.length,
      users: createdUsers
    });
  } catch (error) {
    console.error('❌ Init demo data error:', error);
    return c.json({ 
      success: false,
      error: 'Failed to initialize demo data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// ==================== AUTHENTICATION & USER MANAGEMENT ====================

// Phone to email lookup endpoint (for phone login)
app.post("/make-server-5b21d3ea/auth/get-email-by-phone", async (c) => {
  try {
    const { phone } = await c.req.json();
    
    if (!phone) {
      return c.json({ error: 'Phone number is required' }, 400);
    }

    // Get user ID from phone mapping
    const userId = await kv.get(`user:phone:${phone}`);
    
    if (!userId) {
      return c.json({ error: 'Phone number not found' }, 404);
    }

    // Get user data
    const user = await kv.get(`user:${userId}`);
    
    if (!user || !user.email) {
      return c.json({ error: 'User not found or no email associated' }, 404);
    }

    return c.json({
      success: true,
      email: user.email
    });
  } catch (error) {
    console.error('Get email by phone error:', error);
    return c.json({ error: 'Failed to lookup phone number' }, 500);
  }
});

// Register endpoint (creates profile in KV store)
app.post("/make-server-5b21d3ea/auth/register", async (c) => {
  try {
    const { id, name, email, phone, role, address, donorType } = await c.req.json();
    
    // Validate required fields
    if (!name || !role || !email) {
      return c.json({ error: 'Name, email, and role are required' }, 400);
    }

    // Check if email already exists in KV store
    const existingEmailUser = await kv.get(`user:email:${email}`);
    if (existingEmailUser) {
      // Get existing user
      const existingUser = await kv.get(`user:${existingEmailUser}`);
      if (existingUser) {
        // Return existing user (already registered via Auth)
        const { password: _, ...userWithoutPassword } = existingUser;
        return c.json({
          success: true,
          user: userWithoutPassword,
          message: 'User profile already exists'
        });
      }
    }

    // Check if phone already exists
    if (phone) {
      const existingPhoneUser = await kv.get(`user:phone:${phone}`);
      if (existingPhoneUser && existingPhoneUser !== id) {
        return c.json({ error: 'Phone number already registered' }, 409);
      }
    }

    // Use provided ID (from Supabase Auth) or generate one
    const userId = id || `${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Assign initial credits based on role
    let credits = 0;
    if (role === 'teacher') credits = 50;
    else if (role === 'guardian') credits = 100;

    // Create user object (no password in KV store - handled by Supabase Auth)
    const user = {
      id: userId,
      name,
      email: email || '',
      phone: phone || '',
      role,
      address: address || '',
      donorType: donorType || null,
      credits,
      status: 'active',
      isProfileComplete: false,
      isVerified: id ? true : false, // If ID provided from Auth, user is verified
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save user data
    await kv.set(`user:${userId}`, user);

    // Create email mapping if email provided
    if (email) {
      await kv.set(`user:email:${email}`, userId);
    }

    // Create phone mapping if phone provided
    if (phone) {
      await kv.set(`user:phone:${phone}`, userId);
    }

    return c.json({
      success: true,
      user: user,
      message: 'Profile created successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Login endpoint (NOTE: Authentication is handled by Supabase Auth on client-side)
// This endpoint is kept for backward compatibility but should not be used for new code
// Use Supabase Auth signInWithPassword() instead
app.post("/make-server-5b21d3ea/auth/login", async (c) => {
  try {
    const { emailOrPhone, password } = await c.req.json();
    
    if (!emailOrPhone || !password) {
      return c.json({ error: 'Email/Phone and password required' }, 400);
    }

    // Create Supabase client for authentication
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Determine if input is email or phone
    const isEmail = emailOrPhone.includes('@');
    let loginEmail = emailOrPhone;
    
    if (!isEmail) {
      // Phone login - get email first
      const userId = await kv.get(`user:phone:${emailOrPhone}`);
      if (!userId) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }
      
      const user = await kv.get(`user:${userId}`);
      if (!user || !user.email) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }
      
      loginEmail = user.email;
    }

    // Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: password
    });

    if (authError || !authData.user || !authData.session) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Get user profile from KV store
    const user = await kv.get(`user:${authData.user.id}`);
    
    if (!user) {
      // Fallback: create profile from auth metadata
      return c.json({
        success: true,
        user: {
          id: authData.user.id,
          name: authData.user.user_metadata?.name || 'User',
          email: authData.user.email || '',
          phone: authData.user.user_metadata?.phone || '',
          role: authData.user.user_metadata?.role || 'student',
          address: authData.user.user_metadata?.address || '',
          donorType: authData.user.user_metadata?.donorType,
          credits: 0,
          status: 'active',
          isProfileComplete: false,
          isVerified: authData.user.email_confirmed_at ? true : false,
          createdAt: authData.user.created_at || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        token: authData.session.access_token
      });
    }

    return c.json({
      success: true,
      user: user,
      token: authData.session.access_token
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get user by ID
app.get("/make-server-5b21d3ea/users/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ success: true, user: user });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// Get all users (admin only)
app.get("/make-server-5b21d3ea/users", async (c) => {
  try {
    const role = c.req.query('role');
    const users = await kv.getByPrefix('user:');
    
    let filteredUsers = users
      .filter(u => u.value && u.value.id)
      .map(u => u.value);

    if (role) {
      filteredUsers = filteredUsers.filter(u => u.role === role);
    }

    return c.json({ success: true, users: filteredUsers });
  } catch (error) {
    console.error('Get users error:', error);
    return c.json({ error: 'Failed to get users' }, 500);
  }
});

// Update user
app.put("/make-server-5b21d3ea/users/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const updates = await c.req.json();
    
    const existingUser = await kv.get(`user:${userId}`);
    if (!existingUser) {
      return c.json({ error: 'User not found' }, 404);
    }

    const updatedUser = { ...existingUser, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`user:${userId}`, updatedUser);

    return c.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// ==================== PASSWORD RESET ====================

// Send password reset email (Note: This is handled by Supabase Auth on client-side)
// This endpoint is for verification and logging purposes only
app.post("/make-server-5b21d3ea/auth/password-reset", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Check if user exists in KV store
    const userId = await kv.get(`user:email:${email}`);
    
    if (!userId) {
      // For security, don't reveal if user exists or not
      return c.json({ 
        success: true,
        message: 'If the email exists, a reset link will be sent'
      });
    }

    const user = await kv.get(`user:${userId}`);
    
    if (!user) {
      return c.json({ 
        success: true,
        message: 'If the email exists, a reset link will be sent'
      });
    }

    console.log(`📧 Password reset requested for: ${email} (User ID: ${userId})`);
    
    // Password reset is handled by Supabase Auth on client-side
    // This endpoint just logs the request
    return c.json({ 
      success: true,
      message: 'Password reset email sent successfully'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return c.json({ error: 'Failed to process reset request' }, 500);
  }
});

// ==================== TICKET SYSTEM ====================

// Create ticket
app.post("/make-server-5b21d3ea/tickets", async (c) => {
  try {
    const ticketData = await c.req.json();
    const ticketId = `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const ticket = {
      id: ticketId,
      ...ticketData,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: ticketData.messages || []
    };

    await kv.set(`ticket:${ticketId}`, ticket);
    
    // Add to user's tickets
    const userTicketsKey = `tickets:user:${ticketData.userId}`;
    const userTickets = await kv.get(userTicketsKey) || [];
    userTickets.push(ticketId);
    await kv.set(userTicketsKey, userTickets);

    // Add to all tickets list
    const allTicketsKey = 'tickets:all';
    const allTickets = await kv.get(allTicketsKey) || [];
    allTickets.push(ticketId);
    await kv.set(allTicketsKey, allTickets);

    return c.json({ success: true, ticket });
  } catch (error) {
    console.error('Create ticket error:', error);
    return c.json({ error: 'Failed to create ticket' }, 500);
  }
});

// Get all tickets (admin)
app.get("/make-server-5b21d3ea/tickets", async (c) => {
  try {
    const status = c.req.query('status');
    const userRole = c.req.query('userRole');
    
    const allTicketsKey = 'tickets:all';
    const ticketIds = await kv.get(allTicketsKey) || [];
    
    const tickets = await Promise.all(
      ticketIds.map(async (id: string) => await kv.get(`ticket:${id}`))
    );

    let filteredTickets = tickets.filter(t => t !== null);

    if (status) {
      filteredTickets = filteredTickets.filter(t => t.status === status);
    }

    if (userRole) {
      filteredTickets = filteredTickets.filter(t => t.userRole === userRole);
    }

    return c.json({ success: true, tickets: filteredTickets });
  } catch (error) {
    console.error('Get tickets error:', error);
    return c.json({ error: 'Failed to get tickets' }, 500);
  }
});

// Get user's tickets
app.get("/make-server-5b21d3ea/tickets/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const userTicketsKey = `tickets:user:${userId}`;
    const ticketIds = await kv.get(userTicketsKey) || [];
    
    const tickets = await Promise.all(
      ticketIds.map(async (id: string) => await kv.get(`ticket:${id}`))
    );

    return c.json({ success: true, tickets: tickets.filter(t => t !== null) });
  } catch (error) {
    console.error('Get user tickets error:', error);
    return c.json({ error: 'Failed to get user tickets' }, 500);
  }
});

// Update ticket (admin)
app.put("/make-server-5b21d3ea/tickets/:ticketId", async (c) => {
  try {
    const ticketId = c.req.param('ticketId');
    const updates = await c.req.json();
    
    const existingTicket = await kv.get(`ticket:${ticketId}`);
    if (!existingTicket) {
      return c.json({ error: 'Ticket not found' }, 404);
    }

    const updatedTicket = {
      ...existingTicket,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`ticket:${ticketId}`, updatedTicket);

    return c.json({ success: true, ticket: updatedTicket });
  } catch (error) {
    console.error('Update ticket error:', error);
    return c.json({ error: 'Failed to update ticket' }, 500);
  }
});

// Add message to ticket
app.post("/make-server-5b21d3ea/tickets/:ticketId/messages", async (c) => {
  try {
    const ticketId = c.req.param('ticketId');
    const messageData = await c.req.json();
    
    const ticket = await kv.get(`ticket:${ticketId}`);
    if (!ticket) {
      return c.json({ error: 'Ticket not found' }, 404);
    }

    const message = {
      id: `msg-${Date.now()}`,
      ...messageData,
      createdAt: new Date().toISOString()
    };

    ticket.messages = ticket.messages || [];
    ticket.messages.push(message);
    ticket.updatedAt = new Date().toISOString();

    await kv.set(`ticket:${ticketId}`, ticket);

    return c.json({ success: true, ticket });
  } catch (error) {
    console.error('Add message error:', error);
    return c.json({ error: 'Failed to add message' }, 500);
  }
});

// Create ticket (alternative endpoint for compatibility)
app.post("/make-server-5b21d3ea/ticket/create", async (c) => {
  try {
    const ticketData = await c.req.json();
    const ticketId = `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const ticketNumber = `TKT${Date.now().toString().slice(-8)}`;
    
    const ticket = {
      id: ticketId,
      ticketNumber,
      userId: ticketData.userId,
      userName: ticketData.userName,
      userRole: ticketData.userRole,
      category: ticketData.category,
      priority: ticketData.priority,
      subject: ticketData.subject,
      description: ticketData.description,
      status: 'open',
      responses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`ticket:${ticketId}`, ticket);
    
    // Add to user's tickets
    const userTicketsKey = `tickets:user:${ticketData.userId}`;
    const userTickets = await kv.get(userTicketsKey) || [];
    userTickets.push(ticketId);
    await kv.set(userTicketsKey, userTickets);

    // Add to all tickets list
    const allTicketsKey = 'tickets:all';
    const allTickets = await kv.get(allTicketsKey) || [];
    allTickets.push(ticketId);
    await kv.set(allTicketsKey, allTickets);

    return c.json({ success: true, ticket });
  } catch (error) {
    console.error('Create ticket error:', error);
    return c.json({ error: 'Failed to create ticket' }, 500);
  }
});

// Add reply to ticket (alternative endpoint for compatibility)
app.post("/make-server-5b21d3ea/ticket/:ticketId/reply", async (c) => {
  try {
    const ticketId = c.req.param('ticketId');
    const replyData = await c.req.json();
    
    const ticket = await kv.get(`ticket:${ticketId}`);
    if (!ticket) {
      return c.json({ error: 'Ticket not found' }, 404);
    }

    const response = {
      id: `resp-${Date.now()}`,
      userId: replyData.userId,
      userName: replyData.userName,
      userRole: replyData.userRole,
      message: replyData.message,
      createdAt: new Date().toISOString()
    };

    ticket.responses = ticket.responses || [];
    ticket.responses.push(response);
    ticket.updatedAt = new Date().toISOString();

    // Update status to in-progress if it's open
    if (ticket.status === 'open' && replyData.userRole === 'admin') {
      ticket.status = 'inProgress';
    }

    await kv.set(`ticket:${ticketId}`, ticket);

    return c.json({ success: true, ticket });
  } catch (error) {
    console.error('Add reply error:', error);
    return c.json({ error: 'Failed to add reply' }, 500);
  }
});

// ==================== STUDENT APPLICATIONS ====================

// Create student application
app.post("/make-server-5b21d3ea/student-applications", async (c) => {
  try {
    const applicationData = await c.req.json();
    const applicationId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const application = {
      id: applicationId,
      ...applicationData,
      status: 'pending',
      submittedDate: new Date().toISOString(),
      approvedDate: null,
      fulfilledDate: null,
      donorId: null,
      adminNotes: ''
    };

    await kv.set(`application:${applicationId}`, application);
    
    // Add to pending applications
    const pendingKey = 'applications:pending';
    const pending = await kv.get(pendingKey) || [];
    pending.push(applicationId);
    await kv.set(pendingKey, pending);

    return c.json({ success: true, application });
  } catch (error) {
    console.error('Create application error:', error);
    return c.json({ error: 'Failed to create application' }, 500);
  }
});

// Get applications by status
app.get("/make-server-5b21d3ea/student-applications", async (c) => {
  try {
    const status = c.req.query('status') || 'pending';
    const applicationType = c.req.query('type');
    
    const key = `applications:${status}`;
    const applicationIds = await kv.get(key) || [];
    
    const applications = await Promise.all(
      applicationIds.map(async (id: string) => await kv.get(`application:${id}`))
    );

    let filteredApps = applications.filter(a => a !== null);

    if (applicationType) {
      filteredApps = filteredApps.filter(a => a.applicationType === applicationType);
    }

    return c.json({ success: true, applications: filteredApps });
  } catch (error) {
    console.error('Get applications error:', error);
    return c.json({ error: 'Failed to get applications' }, 500);
  }
});

// Update application status (admin)
app.put("/make-server-5b21d3ea/student-applications/:applicationId", async (c) => {
  try {
    const applicationId = c.req.param('applicationId');
    const updates = await c.req.json();
    
    const application = await kv.get(`application:${applicationId}`);
    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }

    const oldStatus = application.status;
    const newStatus = updates.status || oldStatus;

    const updatedApplication = {
      ...application,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if (newStatus === 'approved' && oldStatus !== 'approved') {
      updatedApplication.approvedDate = new Date().toISOString();
    }
    if (newStatus === 'fulfilled' && oldStatus !== 'fulfilled') {
      updatedApplication.fulfilledDate = new Date().toISOString();
    }

    await kv.set(`application:${applicationId}`, updatedApplication);

    // Update status lists
    if (oldStatus !== newStatus) {
      // Remove from old status list
      const oldKey = `applications:${oldStatus}`;
      const oldList = await kv.get(oldKey) || [];
      const filteredOldList = oldList.filter((id: string) => id !== applicationId);
      await kv.set(oldKey, filteredOldList);

      // Add to new status list
      const newKey = `applications:${newStatus}`;
      const newList = await kv.get(newKey) || [];
      newList.push(applicationId);
      await kv.set(newKey, newList);
    }

    return c.json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error('Update application error:', error);
    return c.json({ error: 'Failed to update application' }, 500);
  }
});

// ==================== ADMIN NOTICES ====================

// Create notice
app.post("/make-server-5b21d3ea/notices", async (c) => {
  try {
    const noticeData = await c.req.json();
    const noticeId = `notice-${Date.now()}`;
    
    const notice = {
      id: noticeId,
      ...noticeData,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    await kv.set(`notice:${noticeId}`, notice);
    
    // Add to notices list
    const noticesKey = 'notices:all';
    const notices = await kv.get(noticesKey) || [];
    notices.push(noticeId);
    await kv.set(noticesKey, notices);

    return c.json({ success: true, notice });
  } catch (error) {
    console.error('Create notice error:', error);
    return c.json({ error: 'Failed to create notice' }, 500);
  }
});

// Get all notices
app.get("/make-server-5b21d3ea/notices", async (c) => {
  try {
    const targetAudience = c.req.query('targetAudience');
    
    const noticesKey = 'notices:all';
    const noticeIds = await kv.get(noticesKey) || [];
    
    const notices = await Promise.all(
      noticeIds.map(async (id: string) => await kv.get(`notice:${id}`))
    );

    let filteredNotices = notices.filter(n => n !== null && n.isActive);

    if (targetAudience) {
      filteredNotices = filteredNotices.filter(n => 
        n.targetAudience === 'all' || n.targetAudience === targetAudience
      );
    }

    return c.json({ success: true, notices: filteredNotices });
  } catch (error) {
    console.error('Get notices error:', error);
    return c.json({ error: 'Failed to get notices' }, 500);
  }
});

// Update notice
app.put("/make-server-5b21d3ea/notices/:noticeId", async (c) => {
  try {
    const noticeId = c.req.param('noticeId');
    const updates = await c.req.json();
    
    const existingNotice = await kv.get(`notice:${noticeId}`);
    if (!existingNotice) {
      return c.json({ error: 'Notice not found' }, 404);
    }

    const updatedNotice = {
      ...existingNotice,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`notice:${noticeId}`, updatedNotice);

    return c.json({ success: true, notice: updatedNotice });
  } catch (error) {
    console.error('Update notice error:', error);
    return c.json({ error: 'Failed to update notice' }, 500);
  }
});

// Delete notice
app.delete("/make-server-5b21d3ea/notices/:noticeId", async (c) => {
  try {
    const noticeId = c.req.param('noticeId');
    
    const notice = await kv.get(`notice:${noticeId}`);
    if (!notice) {
      return c.json({ error: 'Notice not found' }, 404);
    }

    // Soft delete
    notice.isActive = false;
    await kv.set(`notice:${noticeId}`, notice);

    return c.json({ success: true });
  } catch (error) {
    console.error('Delete notice error:', error);
    return c.json({ error: 'Failed to delete notice' }, 500);
  }
});

// ==================== CMS BLOG POSTS ====================

// Get all CMS posts
app.get("/make-server-5b21d3ea/cms/posts", async (c) => {
  try {
    const status = c.req.query('status');
    
    const postsKey = 'cms:posts:all';
    const postIds = await kv.get(postsKey) || [];
    
    const posts = await Promise.all(
      postIds.map(async (id: string) => await kv.get(`cms:post:${id}`))
    );

    let filteredPosts = posts.filter(p => p !== null);

    if (status) {
      filteredPosts = filteredPosts.filter(p => p.status === status);
    }

    return c.json({ success: true, posts: filteredPosts });
  } catch (error) {
    console.error('Get CMS posts error:', error);
    return c.json({ error: 'Failed to get posts' }, 500);
  }
});

// Create CMS post
app.post("/make-server-5b21d3ea/cms/posts", async (c) => {
  try {
    const postData = await c.req.json();
    const postId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const post = {
      id: postId,
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: 0,
    };

    await kv.set(`cms:post:${postId}`, post);
    
    // Add to posts list
    const postsKey = 'cms:posts:all';
    const posts = await kv.get(postsKey) || [];
    posts.push(postId);
    await kv.set(postsKey, posts);

    return c.json({ success: true, post });
  } catch (error) {
    console.error('Create CMS post error:', error);
    return c.json({ error: 'Failed to create post' }, 500);
  }
});

// Update CMS post
app.put("/make-server-5b21d3ea/cms/posts/:postId", async (c) => {
  try {
    const postId = c.req.param('postId');
    const updates = await c.req.json();
    
    const existingPost = await kv.get(`cms:post:${postId}`);
    if (!existingPost) {
      return c.json({ error: 'Post not found' }, 404);
    }

    const updatedPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`cms:post:${postId}`, updatedPost);

    return c.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Update CMS post error:', error);
    return c.json({ error: 'Failed to update post' }, 500);
  }
});

// Delete CMS post
app.delete("/make-server-5b21d3ea/cms/posts/:postId", async (c) => {
  try {
    const postId = c.req.param('postId');
    
    const post = await kv.get(`cms:post:${postId}`);
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    // Soft delete
    post.status = 'deleted';
    await kv.set(`cms:post:${postId}`, post);

    return c.json({ success: true });
  } catch (error) {
    console.error('Delete CMS post error:', error);
    return c.json({ error: 'Failed to delete post' }, 500);
  }
});

// ==================== CMS CATEGORIES & TAGS ====================

// Get categories
app.get("/make-server-5b21d3ea/cms/categories", async (c) => {
  try {
    const categoriesKey = 'cms:categories:all';
    const categoryIds = await kv.get(categoriesKey) || [];
    
    const categories = await Promise.all(
      categoryIds.map(async (id: string) => await kv.get(`cms:category:${id}`))
    );

    return c.json({ success: true, categories: categories.filter(c => c !== null) });
  } catch (error) {
    console.error('Get categories error:', error);
    return c.json({ error: 'Failed to get categories' }, 500);
  }
});

// Get tags
app.get("/make-server-5b21d3ea/cms/tags", async (c) => {
  try {
    const tagsKey = 'cms:tags:all';
    const tagIds = await kv.get(tagsKey) || [];
    
    const tags = await Promise.all(
      tagIds.map(async (id: string) => await kv.get(`cms:tag:${id}`))
    );

    return c.json({ success: true, tags: tags.filter(t => t !== null) });
  } catch (error) {
    console.error('Get tags error:', error);
    return c.json({ error: 'Failed to get tags' }, 500);
  }
});

// ==================== CHAT ROOMS & MESSAGES ====================

// Get user's chat rooms
app.get("/make-server-5b21d3ea/chatrooms/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    const userChatRoomsKey = `chatrooms:user:${userId}`;
    const chatRoomIds = await kv.get(userChatRoomsKey) || [];
    
    const chatRooms = await Promise.all(
      chatRoomIds.map(async (id: string) => await kv.get(`chatroom:${id}`))
    );

    return c.json({ success: true, chatRooms: chatRooms.filter(cr => cr !== null) });
  } catch (error) {
    console.error('Get chat rooms error:', error);
    return c.json({ error: 'Failed to get chat rooms' }, 500);
  }
});

// Create chat room
app.post("/make-server-5b21d3ea/chatrooms", async (c) => {
  try {
    const { participants, contractId, title } = await c.req.json();
    const chatRoomId = `chatroom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const chatRoom = {
      id: chatRoomId,
      participants,
      contractId,
      title,
      lastMessage: null,
      lastMessageTime: null,
      unreadCount: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`chatroom:${chatRoomId}`, chatRoom);
    
    // Add to each participant's chat rooms
    for (const participantId of participants) {
      const userChatRoomsKey = `chatrooms:user:${participantId}`;
      const userChatRooms = await kv.get(userChatRoomsKey) || [];
      if (!userChatRooms.includes(chatRoomId)) {
        userChatRooms.push(chatRoomId);
        await kv.set(userChatRoomsKey, userChatRooms);
      }
    }

    return c.json({ success: true, chatRoom });
  } catch (error) {
    console.error('Create chat room error:', error);
    return c.json({ error: 'Failed to create chat room' }, 500);
  }
});

// Get messages in a chat room
app.get("/make-server-5b21d3ea/messages/:chatRoomId", async (c) => {
  try {
    const chatRoomId = c.req.param('chatRoomId');
    const limit = parseInt(c.req.query('limit') || '100');
    
    const messagesKey = `messages:chatroom:${chatRoomId}`;
    const messageIds = await kv.get(messagesKey) || [];
    
    // Get last N messages
    const recentMessageIds = messageIds.slice(-limit);
    
    const messages = await Promise.all(
      recentMessageIds.map(async (id: string) => await kv.get(`message:${id}`))
    );

    return c.json({ success: true, messages: messages.filter(m => m !== null) });
  } catch (error) {
    console.error('Get messages error:', error);
    return c.json({ error: 'Failed to get messages' }, 500);
  }
});

// Send message
app.post("/make-server-5b21d3ea/messages", async (c) => {
  try {
    const messageData = await c.req.json();
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const message = {
      id: messageId,
      ...messageData,
      createdAt: new Date().toISOString(),
      read: false
    };

    await kv.set(`message:${messageId}`, message);
    
    // Add to chat room's messages
    const messagesKey = `messages:chatroom:${messageData.chatRoomId}`;
    const messages = await kv.get(messagesKey) || [];
    messages.push(messageId);
    await kv.set(messagesKey, messages);

    // Update chat room's last message
    const chatRoom = await kv.get(`chatroom:${messageData.chatRoomId}`);
    if (chatRoom) {
      chatRoom.lastMessage = messageData.text;
      chatRoom.lastMessageTime = new Date().toISOString();
      chatRoom.updatedAt = new Date().toISOString();
      
      // Update unread count for other participants
      for (const participantId of chatRoom.participants) {
        if (participantId !== messageData.senderId) {
          chatRoom.unreadCount = chatRoom.unreadCount || {};
          chatRoom.unreadCount[participantId] = (chatRoom.unreadCount[participantId] || 0) + 1;
        }
      }
      
      await kv.set(`chatroom:${messageData.chatRoomId}`, chatRoom);
    }

    return c.json({ success: true, message });
  } catch (error) {
    console.error('Send message error:', error);
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// Mark messages as read
app.post("/make-server-5b21d3ea/messages/mark-read", async (c) => {
  try {
    const { chatRoomId, userId } = await c.req.json();
    
    const chatRoom = await kv.get(`chatroom:${chatRoomId}`);
    if (chatRoom) {
      chatRoom.unreadCount = chatRoom.unreadCount || {};
      chatRoom.unreadCount[userId] = 0;
      await kv.set(`chatroom:${chatRoomId}`, chatRoom);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Mark messages as read error:', error);
    return c.json({ error: 'Failed to mark messages as read' }, 500);
  }
});

// ==================== INITIALIZE DEMO DATA ====================

app.post("/make-server-5b21d3ea/init-demo-data", async (c) => {
  try {
    // Check if already initialized
    const initialized = await kv.get('demo:initialized');
    if (initialized) {
      return c.json({ message: 'Demo data already initialized' });
    }

    // Create test users
    const users = [
      // Super Admins
      {
        id: 'admin-001',
        email: 'admin1@talenttutor.com',
        phone: '01711111111',
        password: 'Admin@123',
        name: 'সুপার এডমিন ১',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      {
        id: 'admin-002',
        email: 'admin2@talenttutor.com',
        phone: '01711111112',
        password: 'Admin@123',
        name: 'সুপার এডমিন ২',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
      },
      // Teachers
      {
        id: 'teacher-001',
        email: 'teacher1@talenttutor.com',
        phone: '01722222221',
        password: 'Teacher@123',
        name: 'মোঃ করিম উদ্দিন',
        role: 'teacher',
        status: 'active',
        credits: 50,
        subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
        experience: '৫ বছর',
        createdAt: new Date().toISOString()
      },
      {
        id: 'teacher-002',
        email: 'teacher2@talenttutor.com',
        phone: '01722222222',
        password: 'Teacher@123',
        name: 'ফাতিমা আক্তার',
        role: 'teacher',
        status: 'active',
        credits: 50,
        subjects: ['ইংরেজি', 'বাংলা'],
        experience: '৩ বছর',
        createdAt: new Date().toISOString()
      },
      {
        id: 'teacher-003',
        email: 'teacher3@talenttutor.com',
        phone: '01722222223',
        password: 'Teacher@123',
        name: 'রফিকুল ইসলাম',
        role: 'teacher',
        status: 'active',
        credits: 50,
        subjects: ['রসায়ন', 'জীববিজ্ঞান'],
        experience: '৭ বছর',
        createdAt: new Date().toISOString()
      },
      {
        id: 'teacher-004',
        email: 'teacher4@talenttutor.com',
        phone: '01722222224',
        password: 'Teacher@123',
        name: 'নাজমা বেগম',
        role: 'teacher',
        status: 'active',
        credits: 50,
        subjects: ['গণিত', 'ICT'],
        experience: '৪ বছর',
        createdAt: new Date().toISOString()
      },
      {
        id: 'teacher-005',
        email: 'teacher5@talenttutor.com',
        phone: '01722222225',
        password: 'Teacher@123',
        name: 'আব্দুল্লাহ আল মামুন',
        role: 'teacher',
        status: 'active',
        credits: 50,
        subjects: ['পদার্থবিজ্ঞান', 'গণিত'],
        experience: '৬ বছর',
        createdAt: new Date().toISOString()
      },
      // Guardians
      {
        id: 'guardian-001',
        email: 'guardian1@talenttutor.com',
        phone: '01733333331',
        password: 'Guardian@123',
        name: 'জনাব আহমেদ',
        role: 'guardian',
        status: 'active',
        credits: 100,
        children: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 'guardian-002',
        email: 'guardian2@talenttutor.com',
        phone: '01733333332',
        password: 'Guardian@123',
        name: 'মিসেস সালমা',
        role: 'guardian',
        status: 'active',
        credits: 100,
        children: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: 'guardian-003',
        email: 'guardian3@talenttutor.com',
        phone: '01733333333',
        password: 'Guardian@123',
        name: 'জনাব রহিম',
        role: 'guardian',
        status: 'active',
        credits: 100,
        children: 3,
        createdAt: new Date().toISOString()
      },
      {
        id: 'guardian-004',
        email: 'guardian4@talenttutor.com',
        phone: '01733333334',
        password: 'Guardian@123',
        name: 'মিসেস হাসিনা',
        role: 'guardian',
        status: 'active',
        credits: 100,
        children: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 'guardian-005',
        email: 'guardian5@talenttutor.com',
        phone: '01733333335',
        password: 'Guardian@123',
        name: 'জনাব কামাল',
        role: 'guardian',
        status: 'active',
        credits: 100,
        children: 1,
        createdAt: new Date().toISOString()
      },
      // Students
      {
        id: 'student-001',
        email: 'student1@talenttutor.com',
        phone: '01744444441',
        password: 'Student@123',
        name: 'রিয়া খাতুন',
        role: 'student',
        status: 'active',
        class: 'ক্লাস ১০',
        school: 'সরকারি বালিকা উচ্চ বিদ্যালয়',
        createdAt: new Date().toISOString()
      },
      {
        id: 'student-002',
        email: 'student2@talenttutor.com',
        phone: '01744444442',
        password: 'Student@123',
        name: 'সাকিব হোসেন',
        role: 'student',
        status: 'active',
        class: 'ক্লাস ৯',
        school: 'আদর্শ স্কুল',
        createdAt: new Date().toISOString()
      },
      {
        id: 'student-003',
        email: 'student3@talenttutor.com',
        phone: '01744444443',
        password: 'Student@123',
        name: 'আয়েশা সিদ্দিকা',
        role: 'student',
        status: 'active',
        class: 'ক্লাস ৮',
        school: 'মডেল স্কুল',
        createdAt: new Date().toISOString()
      },
      {
        id: 'student-004',
        email: 'student4@talenttutor.com',
        phone: '01744444444',
        password: 'Student@123',
        name: 'তানভীর আহমেদ',
        role: 'student',
        status: 'active',
        class: 'ক্লাস ৭',
        school: 'সরকারি বালক উচ্চ বিদ্যালয়',
        createdAt: new Date().toISOString()
      },
      {
        id: 'student-005',
        email: 'student5@talenttutor.com',
        phone: '01744444445',
        password: 'Student@123',
        name: 'রাবেয়া খানম',
        role: 'student',
        status: 'active',
        class: 'ক্লাস ১০',
        school: 'আদর্শ বালিকা বিদ্যালয়',
        createdAt: new Date().toISOString()
      },
      // Donors
      {
        id: 'donor-001',
        email: 'donor1@talenttutor.com',
        phone: '01755555551',
        password: 'Donor@123',
        name: 'জনাব মাহমুদ',
        role: 'donor',
        donorType: 'zakat',
        status: 'active',
        totalDonated: 50000,
        createdAt: new Date().toISOString()
      },
      {
        id: 'donor-002',
        email: 'donor2@talenttutor.com',
        phone: '01755555552',
        password: 'Donor@123',
        name: 'মিসেস জান্নাত',
        role: 'donor',
        donorType: 'materials',
        status: 'active',
        totalDonated: 0,
        booksDonated: 50,
        createdAt: new Date().toISOString()
      },
      {
        id: 'donor-003',
        email: 'donor3@talenttutor.com',
        phone: '01755555553',
        password: 'Donor@123',
        name: 'জনাব সালাম',
        role: 'donor',
        donorType: 'zakat',
        status: 'active',
        totalDonated: 75000,
        createdAt: new Date().toISOString()
      },
      {
        id: 'donor-004',
        email: 'donor4@talenttutor.com',
        phone: '01755555554',
        password: 'Donor@123',
        name: 'মিসেস রুবিনা',
        role: 'donor',
        donorType: 'materials',
        status: 'active',
        totalDonated: 0,
        booksDonated: 30,
        createdAt: new Date().toISOString()
      },
      {
        id: 'donor-005',
        email: 'donor5@talenttutor.com',
        phone: '01755555555',
        password: 'Donor@123',
        name: 'জনাব ফারুক',
        role: 'donor',
        donorType: 'zakat',
        status: 'active',
        totalDonated: 100000,
        createdAt: new Date().toISOString()
      }
    ];

    // Save all users (add isProfileComplete and isVerified for all)
    for (const user of users) {
      const enhancedUser = {
        ...user,
        isProfileComplete: true, // Demo users have complete profiles
        isVerified: true, // Demo users are verified
        updatedAt: new Date().toISOString()
      };
      await kv.set(`user:${user.id}`, enhancedUser);
      await kv.set(`user:email:${user.email}`, user.id);
      await kv.set(`user:phone:${user.phone}`, user.id);
    }

    // Create demo tuition posts
    const tuitionPosts = [
      {
        id: 'tuition-post-demo-001',
        guardianId: 'guardian-001',
        guardianName: 'জনাব আহমেদ',
        title: 'ক্লাস ৮ - গণিত ও বিজ্ঞান টিউটর প্রয়োজন',
        subject: 'গণিত, বিজ্ঞান',
        class: 'ক্লাস ৮',
        location: 'মিরপুর, ঢাকা',
        salary: '৫০০০',
        schedule: 'সপ্তাহে ৩ দিন',
        description: 'ক্লাস ৮ এর জন্য গণিত ও বিজ্ঞানের একজন দক্ষ টিউটর চাই।',
        status: 'active',
        applications: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'tuition-post-demo-002',
        guardianId: 'guardian-002',
        guardianName: 'মিসেস সালমা',
        title: 'SSC পরীক্ষার্থীর জন্য ইংরেজি টিউটর',
        subject: 'ইংরেজি',
        class: 'ক্লাস ১০',
        location: 'ধানমন্ডি, ঢাকা',
        salary: '৬০০০',
        schedule: 'প্রতিদিন',
        description: 'SSC পরীক্ষার জন্য ইংরেজিতে দক্ষ টিউটর প্রয়োজন।',
        status: 'active',
        applications: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'tuition-post-demo-003',
        guardianId: 'guardian-003',
        guardianName: 'জনাব রহিম',
        title: 'ক্লাস ৯ - রসায়ন ও জীববিজ্ঞান',
        subject: 'রসায়ন, জীববিজ্ঞান',
        class: 'ক্লাস ৯',
        location: 'উত্তরা, ঢাকা',
        salary: '৭০০০',
        schedule: 'সপ্তাহে ৪ দিন',
        description: 'বিজ্ঞান বিভাগের ছাত্রের জন্য অভিজ্ঞ টিউটর চাই।',
        status: 'active',
        applications: [],
        createdAt: new Date().toISOString()
      }
    ];

    // Save tuition posts
    for (const post of tuitionPosts) {
      await kv.set(`tuition-post:${post.id}`, post);
      
      // Add to guardian's posts
      const guardianPostsKey = `tuition-posts:guardian:${post.guardianId}`;
      const guardianPosts = await kv.get(guardianPostsKey) || [];
      guardianPosts.push(post.id);
      await kv.set(guardianPostsKey, guardianPosts);
      
      // Add to all posts
      const allPostsKey = 'tuition-posts:all';
      const allPosts = await kv.get(allPostsKey) || [];
      allPosts.push(post.id);
      await kv.set(allPostsKey, allPosts);
    }

    // Create demo applications
    const applications = [
      {
        id: 'application-demo-001',
        postId: 'tuition-post-demo-001',
        teacherId: 'teacher-001',
        teacherName: 'মোঃ করিম উদ্দিন',
        proposalNote: 'আমি ৫ বছরের অভিজ্ঞতা সহ গণিত ও পদার্থবিজ্ঞানের শিক্ষক। আপনার সন্তানকে পড়াতে আগ্রহী।',
        proposedFee: '৫০০০',
        status: 'pending',
        appliedAt: new Date().toISOString()
      },
      {
        id: 'application-demo-002',
        postId: 'tuition-post-demo-001',
        teacherId: 'teacher-004',
        teacherName: 'নাজমা বেগম',
        proposalNote: 'গণিত ও ICT তে দক্ষ। বুয়েট থেকে পাশ। ছাত্র-ছাত্রীদের পড়াতে ভালো লাগে।',
        proposedFee: '৪৫০০',
        status: 'pending',
        appliedAt: new Date().toISOString()
      },
      {
        id: 'application-demo-003',
        postId: 'tuition-post-demo-002',
        teacherId: 'teacher-002',
        teacherName: 'ফাতিমা আক্তার',
        proposalNote: 'ইংরেজি ও বাংলায় MA করেছি। SSC পরীক্ষার্থীদের পড়ানোর অভিজ্ঞতা আছে।',
        proposedFee: '৬০০০',
        status: 'pending',
        appliedAt: new Date().toISOString()
      },
      {
        id: 'application-demo-004',
        postId: 'tuition-post-demo-003',
        teacherId: 'teacher-003',
        teacherName: 'রফিকুল ইসলাম',
        proposalNote: 'রসায়ন ও জীববিজ্ঞানে এমএসসি করেছি। ৭ বছরের টিচিং অভিজ্ঞতা।',
        proposedFee: '৭০০০',
        status: 'pending',
        appliedAt: new Date().toISOString()
      }
    ];

    // Save applications
    for (const app of applications) {
      await kv.set(`application:${app.id}`, app);
      
      // Add to post's applications
      const post = await kv.get(`tuition-post:${app.postId}`);
      if (post) {
        post.applications = post.applications || [];
        post.applications.push(app.id);
        await kv.set(`tuition-post:${app.postId}`, post);
      }
      
      // Add to teacher's applications
      const teacherAppsKey = `applications:teacher:${app.teacherId}`;
      const teacherApps = await kv.get(teacherAppsKey) || [];
      teacherApps.push(app.id);
      await kv.set(teacherAppsKey, teacherApps);
    }

    // Create demo student profiles (for donor applications)
    const studentProfiles = [
      {
        studentId: 'student-001',
        status: 'approved',
        formData: {
          fullName: 'রিয়া খাতুন',
          currentClass: 'ক্লাস ১০',
          school: 'সরকারি বালিকা উচ্চ বিদ্যালয়',
          address: 'মিরপুর, ঢাকা',
          district: 'ঢাকা',
          monthlyIncome: '8000',
          familyMembers: '5',
          whyNeedHelp: 'পরিবারের আর্থিক সমস্যার কারণে পড়াশোনার খরচ বহন করতে পারছি না। বই এবং পড়ার উপকরণ কিনতে পারছি না।',
          needsType: 'যাকাত সাহায্য',
          amountNeeded: '5000',
          educationalGoals: 'এসএসসি পরীক্ষায় ভাল ফল করে মেডিকেল কলেজে ভর্তি হতে চাই'
        },
        submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        studentId: 'student-002',
        status: 'approved',
        formData: {
          fullName: 'সাকিব হোসেন',
          currentClass: 'ক্লাস ৯',
          school: 'আদর্শ স্কুল',
          address: 'উত্তরা, ঢাকা',
          district: 'ঢাকা',
          monthlyIncome: '6000',
          familyMembers: '6',
          whyNeedHelp: 'বাবা অসুস্থ হওয়ায় পরিবারের আয় কমে গেছে। পড়াশোনা চালিয়ে যেতে সাহায্য প্রয়োজন।',
          needsType: 'শিক্ষা উপকরণ',
          amountNeeded: '3000',
          educationalGoals: 'ইঞ্জিনিয়ার হতে চাই'
        },
        submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        studentId: 'student-003',
        status: 'approved',
        formData: {
          fullName: 'আয়েশা সিদ্দিকা',
          currentClass: 'ক্লাস ৮',
          school: 'মডেল স্কুল',
          address: 'গুলশান, ঢাকা',
          district: 'ঢাকা',
          monthlyIncome: '4500',
          familyMembers: '4',
          whyNeedHelp: 'মা একাই পরিবার চালান। পড়াশোনার জন্য বই এবং টিউশনের টাকা নেই।',
          needsType: 'যাকাত সাহায্য',
          amountNeeded: '7000',
          educationalGoals: 'শিক্ষক হতে চাই'
        },
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        studentId: 'student-demo-001',
        status: 'approved',
        formData: {
          fullName: 'তানভীর আহমেদ',
          currentClass: 'ক্লাস ৭',
          school: 'বাংলা মিডিয়াম স্কুল',
          address: 'মোহাম্মদপুর, ঢাকা',
          district: 'ঢাকা',
          monthlyIncome: '3000',
          familyMembers: '5',
          whyNeedHelp: 'দরিদ্র পরিবার থেকে এসেছি। পড়াশোনা চালিয়ে যেতে সাহায্য চাই।',
          needsType: 'শিক্ষা উপকরণ',
          amountNeeded: '4000',
          educationalGoals: 'ভালো মানের শিক্ষা লাভ করতে চাই'
        },
        submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        studentId: 'student-demo-002',
        status: 'approved',
        formData: {
          fullName: 'নাজমা বেগম',
          currentClass: 'ক্লাস ৬',
          school: 'সরকারি প্রাথমিক বিদ্যালয়',
          address: 'যাত্রাবাড়ী, ঢাকা',
          district: 'ঢাকা',
          monthlyIncome: '5000',
          familyMembers: '7',
          whyNeedHelp: 'বড় পরিবার, আয় কম। বই কিনতে পারছি না।',
          needsType: 'শিক্ষা উপকরণ',
          amountNeeded: '2500',
          educationalGoals: 'ভালো ছাত্রী হতে চাই'
        },
        submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Save student profiles
    const approvedProfileIds: string[] = [];
    for (const profile of studentProfiles) {
      await kv.set(`student-profile:${profile.studentId}`, profile);
      
      // Add to approved list if status is approved
      if (profile.status === 'approved') {
        approvedProfileIds.push(profile.studentId);
      }
    }
    
    // Update approved profiles list
    if (approvedProfileIds.length > 0) {
      const approvedKey = 'student-profiles:approved';
      const existingApproved = await kv.get(approvedKey) || [];
      const uniqueApproved = [...new Set([...existingApproved, ...approvedProfileIds])];
      await kv.set(approvedKey, uniqueApproved);
      console.log(`✅ Added ${approvedProfileIds.length} profiles to approved list`);
    }

    // Mark as initialized
    await kv.set('demo:initialized', true);

    return c.json({
      success: true,
      message: 'Demo data initialized successfully',
      users: users.map(u => ({
        id: u.id,
        email: u.email,
        phone: u.phone,
        password: u.password,
        name: u.name,
        role: u.role,
        donorType: u.donorType
      })),
      tuitionPosts: tuitionPosts.length,
      applications: applications.length,
      studentProfiles: studentProfiles.length,
      approvedProfiles: approvedProfileIds.length
    });
  } catch (error) {
    console.error('Initialize demo data error:', error);
    return c.json({ error: 'Failed to initialize demo data' }, 500);
  }
});

// ==================== STUDENT PROFILE MANAGEMENT ====================

// Save student profile draft
app.post("/make-server-5b21d3ea/student-profile/save-draft", async (c) => {
  try {
    const profileData = await c.req.json();
    const { studentId } = profileData;
    
    if (!studentId) {
      return c.json({ error: 'Student ID required' }, 400);
    }
    
    const profileKey = `student-profile:${studentId}`;
    const existingProfile = await kv.get(profileKey) || {};
    
    const updatedProfile = {
      ...existingProfile,
      ...profileData,
      lastSavedAt: new Date().toISOString(),
    };
    
    await kv.set(profileKey, updatedProfile);
    
    return c.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Save student profile draft error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      console.log('⚠️ Database table not initialized. Please run CREATE_DATABASE_TABLE.sql');
      return c.json({ 
        error: 'Database table not found',
        warning: 'Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard'
      }, 503);
    }
    return c.json({ error: 'Failed to save profile draft' }, 500);
  }
});

// Submit student profile for review
app.post("/make-server-5b21d3ea/student-profile/submit", async (c) => {
  try {
    const profileData = await c.req.json();
    const { studentId } = profileData;
    
    if (!studentId) {
      return c.json({ error: 'Student ID required' }, 400);
    }
    
    const profileKey = `student-profile:${studentId}`;
    
    const submittedProfile = {
      ...profileData,
      submittedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };
    
    await kv.set(profileKey, submittedProfile);
    
    // Add to pending profiles list for admin review
    const pendingProfilesKey = 'student-profiles:pending';
    const pendingProfiles = await kv.get(pendingProfilesKey) || [];
    if (!pendingProfiles.includes(studentId)) {
      pendingProfiles.push(studentId);
      await kv.set(pendingProfilesKey, pendingProfiles);
    }
    
    return c.json({ success: true, profile: submittedProfile });
  } catch (error) {
    console.error('Submit student profile error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      console.log('⚠️ Database table not initialized.');
      return c.json({ 
        error: 'Database table not found',
        warning: 'Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard'
      }, 503);
    }
    return c.json({ error: 'Failed to submit profile' }, 500);
  }
});

// Get student profile by ID
app.get("/make-server-5b21d3ea/student-profile/:studentId", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    const profileKey = `student-profile:${studentId}`;
    const profile = await kv.get(profileKey);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    return c.json({ success: true, profile });
  } catch (error) {
    console.error('Get student profile error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      console.log('⚠️ Database table not initialized.');
      return c.json({ 
        error: 'Profile not found',
        warning: 'Database table not initialized'
      }, 404);
    }
    return c.json({ error: 'Failed to get profile' }, 500);
  }
});

// Get all student profiles (admin only)
app.get("/make-server-5b21d3ea/student-profiles", async (c) => {
  try {
    const status = c.req.query('status');
    
    let profileIds: string[] = [];
    
    if (status === 'pending_approval') {
      const pendingProfilesKey = 'student-profiles:pending';
      profileIds = await kv.get(pendingProfilesKey) || [];
    } else if (status === 'approved') {
      const approvedProfilesKey = 'student-profiles:approved';
      profileIds = await kv.get(approvedProfilesKey) || [];
    } else if (status === 'rejected') {
      const rejectedProfilesKey = 'student-profiles:rejected';
      profileIds = await kv.get(rejectedProfilesKey) || [];
    } else if (status === 'needs_update') {
      const needsUpdateProfilesKey = 'student-profiles:needs_update';
      profileIds = await kv.get(needsUpdateProfilesKey) || [];
    } else {
      // Get all profiles
      const allProfileData = await kv.getByPrefix('student-profile:');
      return c.json({ 
        success: true, 
        profiles: allProfileData.map(p => p.value).filter(p => p !== null) 
      });
    }
    
    const profiles = await Promise.all(
      profileIds.map(async (id: string) => await kv.get(`student-profile:${id}`))
    );
    
    return c.json({ 
      success: true, 
      profiles: profiles.filter(p => p !== null) 
    });
  } catch (error) {
    console.error('Get student profiles error:', error);
    
    // If table doesn't exist, return empty array instead of error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      console.log('⚠️ Database table not initialized. Returning empty profiles.');
      return c.json({ 
        success: true, 
        profiles: [], 
        warning: 'Database table kv_store_5b21d3ea not found. Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard.' 
      });
    }
    
    return c.json({ error: 'Failed to get profiles' }, 500);
  }
});

// Update student profile status (admin only)
app.put("/make-server-5b21d3ea/student-profile/:studentId/status", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    const { status, adminNotes, reviewedBy } = await c.req.json();
    
    const profileKey = `student-profile:${studentId}`;
    const profile = await kv.get(profileKey);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    const oldStatus = profile.status;
    
    const updatedProfile = {
      ...profile,
      status,
      adminNotes: adminNotes || profile.adminNotes || '',
      reviewedBy: reviewedBy || profile.reviewedBy,
      reviewedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };
    
    await kv.set(profileKey, updatedProfile);
    
    // Update status lists
    if (oldStatus !== status) {
      // Remove from old status list
      if (oldStatus === 'pending_approval') {
        const pendingKey = 'student-profiles:pending';
        const pending = await kv.get(pendingKey) || [];
        const filtered = pending.filter((id: string) => id !== studentId);
        await kv.set(pendingKey, filtered);
      } else if (oldStatus === 'approved') {
        const approvedKey = 'student-profiles:approved';
        const approved = await kv.get(approvedKey) || [];
        const filtered = approved.filter((id: string) => id !== studentId);
        await kv.set(approvedKey, filtered);
      } else if (oldStatus === 'rejected') {
        const rejectedKey = 'student-profiles:rejected';
        const rejected = await kv.get(rejectedKey) || [];
        const filtered = rejected.filter((id: string) => id !== studentId);
        await kv.set(rejectedKey, filtered);
      } else if (oldStatus === 'needs_update') {
        const needsUpdateKey = 'student-profiles:needs_update';
        const needsUpdate = await kv.get(needsUpdateKey) || [];
        const filtered = needsUpdate.filter((id: string) => id !== studentId);
        await kv.set(needsUpdateKey, filtered);
      }
      
      // Add to new status list
      if (status === 'pending_approval') {
        const pendingKey = 'student-profiles:pending';
        const pending = await kv.get(pendingKey) || [];
        if (!pending.includes(studentId)) {
          pending.push(studentId);
          await kv.set(pendingKey, pending);
        }
      } else if (status === 'approved') {
        const approvedKey = 'student-profiles:approved';
        const approved = await kv.get(approvedKey) || [];
        if (!approved.includes(studentId)) {
          approved.push(studentId);
          await kv.set(approvedKey, approved);
        }
        
        // Update user's profileVerified status
        const userKey = `user:${studentId}`;
        const user = await kv.get(userKey);
        if (user) {
          user.profileVerified = true;
          user.profileVerifiedAt = new Date().toISOString();
          await kv.set(userKey, user);
        }
      } else if (status === 'rejected') {
        const rejectedKey = 'student-profiles:rejected';
        const rejected = await kv.get(rejectedKey) || [];
        if (!rejected.includes(studentId)) {
          rejected.push(studentId);
          await kv.set(rejectedKey, rejected);
        }
      } else if (status === 'needs_update') {
        const needsUpdateKey = 'student-profiles:needs_update';
        const needsUpdate = await kv.get(needsUpdateKey) || [];
        if (!needsUpdate.includes(studentId)) {
          needsUpdate.push(studentId);
          await kv.set(needsUpdateKey, needsUpdate);
        }
      }
    }
    
    return c.json({ success: true, profile: updatedProfile });
  } catch (error) {
    console.error('Update student profile status error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('does not exist') || errorMessage.includes('schema cache') || errorMessage.includes('not find')) {
      console.log('⚠️ Database table not initialized.');
      return c.json({ 
        error: 'Database table not found',
        warning: 'Please run CREATE_DATABASE_TABLE.sql in Supabase Dashboard'
      }, 503);
    }
    return c.json({ error: 'Failed to update profile status' }, 500);
  }
});

// ==================== DOCUMENT UPLOAD (SUPABASE STORAGE) ====================

// Initialize Supabase client for storage (using createClient already imported at top)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Create storage bucket on startup
const initializeBucket = async () => {
  const bucketName = 'make-5b21d3ea-student-documents';
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 5242880 // 5MB
      });
      console.log(`Bucket ${bucketName} created successfully`);
    }
  } catch (error) {
    console.error('Bucket initialization error:', error);
  }
};

// Initialize bucket
initializeBucket();

// Upload document endpoint
app.post("/make-server-5b21d3ea/student-profile/upload-document", async (c) => {
  try {
    const { studentId, documentType, fileData, fileName, mimeType } = await c.req.json();
    
    if (!studentId || !documentType || !fileData || !fileName) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const bucketName = 'make-5b21d3ea-student-documents';
    const filePath = `${studentId}/${documentType}/${Date.now()}-${fileName}`;
    
    // Convert base64 to buffer
    const base64Data = fileData.split(',')[1] || fileData;
    const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: mimeType || 'application/octet-stream',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return c.json({ error: 'Upload failed', details: uploadError }, 500);
    }
    
    // Generate signed URL (valid for 1 year)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filePath, 31536000); // 1 year in seconds
    
    if (signedUrlError) {
      console.error('Signed URL error:', signedUrlError);
      return c.json({ error: 'Failed to generate signed URL' }, 500);
    }
    
    // Store document metadata
    const documentMetadata = {
      studentId,
      documentType,
      fileName,
      filePath,
      signedUrl: signedUrlData.signedUrl,
      uploadedAt: new Date().toISOString(),
      mimeType: mimeType || 'application/octet-stream',
      fileSize: buffer.length
    };
    
    const documentKey = `document:${studentId}:${documentType}`;
    await kv.set(documentKey, documentMetadata);
    
    return c.json({ 
      success: true, 
      document: documentMetadata 
    });
  } catch (error) {
    console.error('Document upload error:', error);
    return c.json({ error: 'Failed to upload document', details: String(error) }, 500);
  }
});

// Get document by type
app.get("/make-server-5b21d3ea/student-profile/:studentId/document/:documentType", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    const documentType = c.req.param('documentType');
    
    const documentKey = `document:${studentId}:${documentType}`;
    const document = await kv.get(documentKey);
    
    if (!document) {
      return c.json({ error: 'Document not found' }, 404);
    }
    
    // Generate fresh signed URL if needed
    const bucketName = 'make-5b21d3ea-student-documents';
    const { data: signedUrlData } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(document.filePath, 3600); // 1 hour
    
    return c.json({ 
      success: true, 
      document: {
        ...document,
        signedUrl: signedUrlData?.signedUrl || document.signedUrl
      }
    });
  } catch (error) {
    console.error('Get document error:', error);
    return c.json({ error: 'Failed to get document' }, 500);
  }
});

// Get all documents for a student
app.get("/make-server-5b21d3ea/student-profile/:studentId/documents", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    
    const documentPrefix = `document:${studentId}:`;
    const documents = await kv.getByPrefix(documentPrefix);
    
    return c.json({ 
      success: true, 
      documents: documents.map(d => d.value).filter(d => d !== null) 
    });
  } catch (error) {
    console.error('Get documents error:', error);
    return c.json({ error: 'Failed to get documents' }, 500);
  }
});

// ==================== PROFILE COMPLETION STATUS REPORT ====================

// Get profile completion report
app.get("/make-server-5b21d3ea/student-profile/:studentId/completion-report", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    
    const profileKey = `student-profile:${studentId}`;
    const profile = await kv.get(profileKey);
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    const formData = profile.formData || {};
    const documents = profile.documents || {};
    
    // Calculate completion percentages
    const personalFields = ['fullName', 'dateOfBirth', 'gender', 'phone', 'address', 'district'];
    const personalCompleted = personalFields.filter(f => formData[f]).length;
    const personalPercentage = Math.round((personalCompleted / personalFields.length) * 100);
    
    const educationalFields = ['currentClass', 'school', 'rollNumber', 'studentId', 'medium', 'version'];
    const educationalCompleted = educationalFields.filter(f => formData[f]).length;
    const educationalPercentage = Math.round((educationalCompleted / educationalFields.length) * 100);
    
    const familyFields = ['fatherName', 'motherName', 'guardianName', 'guardianPhone', 'guardianNID', 'monthlyIncome'];
    const familyCompleted = familyFields.filter(f => formData[f]).length;
    const familyPercentage = Math.round((familyCompleted / familyFields.length) * 100);
    
    const requiredDocs = ['studentIdCard', 'schoolCertificate', 'birthCertificate', 'guardianNIDCopy', 'studentPhoto'];
    const docsCompleted = requiredDocs.filter(d => documents[d]).length;
    const docsPercentage = Math.round((docsCompleted / requiredDocs.length) * 100);
    
    const additionalFields = ['whyNeedHelp', 'educationalGoals'];
    const additionalCompleted = additionalFields.filter(f => formData[f]).length;
    const additionalPercentage = Math.round((additionalCompleted / additionalFields.length) * 100);
    
    // Overall completion
    const totalFields = personalFields.length + educationalFields.length + familyFields.length + requiredDocs.length + additionalFields.length;
    const totalCompleted = personalCompleted + educationalCompleted + familyCompleted + docsCompleted + additionalCompleted;
    const overallPercentage = Math.round((totalCompleted / totalFields) * 100);
    
    const report = {
      studentId,
      studentName: formData.fullName || 'N/A',
      status: profile.status || 'draft',
      overall: {
        percentage: overallPercentage,
        completed: totalCompleted,
        total: totalFields
      },
      sections: {
        personal: {
          percentage: personalPercentage,
          completed: personalCompleted,
          total: personalFields.length,
          missingFields: personalFields.filter(f => !formData[f])
        },
        educational: {
          percentage: educationalPercentage,
          completed: educationalCompleted,
          total: educationalFields.length,
          missingFields: educationalFields.filter(f => !formData[f])
        },
        family: {
          percentage: familyPercentage,
          completed: familyCompleted,
          total: familyFields.length,
          missingFields: familyFields.filter(f => !formData[f])
        },
        documents: {
          percentage: docsPercentage,
          completed: docsCompleted,
          total: requiredDocs.length,
          missingDocuments: requiredDocs.filter(d => !documents[d])
        },
        additional: {
          percentage: additionalPercentage,
          completed: additionalCompleted,
          total: additionalFields.length,
          missingFields: additionalFields.filter(f => !formData[f])
        }
      },
      lastUpdated: profile.lastUpdatedAt || profile.submittedAt || profile.lastSavedAt,
      submittedAt: profile.submittedAt,
      reviewedAt: profile.reviewedAt,
      adminNotes: profile.adminNotes || ''
    };
    
    return c.json({ success: true, report });
  } catch (error) {
    console.error('Get completion report error:', error);
    return c.json({ error: 'Failed to generate completion report' }, 500);
  }
});

// Get all profiles completion summary (admin)
app.get("/make-server-5b21d3ea/student-profiles/completion-summary", async (c) => {
  try {
    const allProfileData = await kv.getByPrefix('student-profile:');
    const profiles = allProfileData.map(p => p.value).filter(p => p !== null);
    
    const summary = {
      total: profiles.length,
      byStatus: {
        draft: profiles.filter(p => p.status === 'draft').length,
        pending_approval: profiles.filter(p => p.status === 'pending_approval').length,
        approved: profiles.filter(p => p.status === 'approved').length,
        needs_update: profiles.filter(p => p.status === 'needs_update').length,
        rejected: profiles.filter(p => p.status === 'rejected').length
      },
      completionRanges: {
        complete: 0,      // 100%
        almostComplete: 0, // 80-99%
        partial: 0,       // 50-79%
        minimal: 0        // < 50%
      }
    };
    
    // Calculate completion for each profile
    profiles.forEach(profile => {
      const formData = profile.formData || {};
      const documents = profile.documents || {};
      
      const allFields = ['fullName', 'dateOfBirth', 'gender', 'phone', 'address', 'district',
                         'currentClass', 'school', 'rollNumber', 'studentId', 'medium', 'version',
                         'fatherName', 'motherName', 'guardianName', 'guardianPhone', 'guardianNID', 'monthlyIncome',
                         'whyNeedHelp', 'educationalGoals'];
      const requiredDocs = ['studentIdCard', 'schoolCertificate', 'birthCertificate', 'guardianNIDCopy', 'studentPhoto'];
      
      const fieldsCompleted = allFields.filter(f => formData[f]).length;
      const docsCompleted = requiredDocs.filter(d => documents[d]).length;
      const totalCompleted = fieldsCompleted + docsCompleted;
      const totalRequired = allFields.length + requiredDocs.length;
      
      const percentage = Math.round((totalCompleted / totalRequired) * 100);
      
      if (percentage === 100) {
        summary.completionRanges.complete++;
      } else if (percentage >= 80) {
        summary.completionRanges.almostComplete++;
      } else if (percentage >= 50) {
        summary.completionRanges.partial++;
      } else {
        summary.completionRanges.minimal++;
      }
    });
    
    return c.json({ success: true, summary });
  } catch (error) {
    console.error('Get completion summary error:', error);
    return c.json({ error: 'Failed to generate completion summary' }, 500);
  }
});

// ==================== SMS/EMAIL NOTIFICATION SYSTEM ====================

// Send notification (SMS/Email)
app.post("/make-server-5b21d3ea/notifications/send", async (c) => {
  try {
    const { userId, type, channel, subject, message, data } = await c.req.json();
    
    if (!userId || !type || !channel || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Get user info
    const user = await kv.get(`user:${userId}`);
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    const notificationId = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const notification = {
      id: notificationId,
      userId,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      type, // 'profile_approved', 'profile_needs_update', 'application_status', 'general'
      channel, // 'email', 'sms', 'both'
      subject,
      message,
      data: data || {},
      status: 'pending',
      sentAt: null,
      createdAt: new Date().toISOString()
    };
    
    // In a real implementation, you would integrate with SMS/Email service here
    // For now, we'll just log and mark as sent
    console.log(`Notification to send - Channel: ${channel}, User: ${user.name} (${user.email}/${user.phone})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    
    // Simulate successful sending
    notification.status = 'sent';
    notification.sentAt = new Date().toISOString();
    
    // Store notification
    await kv.set(`notification:${notificationId}`, notification);
    
    // Add to user's notifications
    const userNotificationsKey = `notifications:user:${userId}`;
    const userNotifications = await kv.get(userNotificationsKey) || [];
    userNotifications.push(notificationId);
    await kv.set(userNotificationsKey, userNotifications);
    
    return c.json({ success: true, notification });
  } catch (error) {
    console.error('Send notification error:', error);
    return c.json({ error: 'Failed to send notification', details: String(error) }, 500);
  }
});

// Get user notifications
app.get("/make-server-5b21d3ea/notifications/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const limit = parseInt(c.req.query('limit') || '50');
    
    const userNotificationsKey = `notifications:user:${userId}`;
    const notificationIds = await kv.get(userNotificationsKey) || [];
    
    // Get last N notifications
    const recentNotificationIds = notificationIds.slice(-limit);
    
    const notifications = await Promise.all(
      recentNotificationIds.map(async (id: string) => await kv.get(`notification:${id}`))
    );
    
    return c.json({ 
      success: true, 
      notifications: notifications.filter(n => n !== null).reverse() 
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    return c.json({ error: 'Failed to get notifications' }, 500);
  }
});

// Send notification when profile is approved
app.post("/make-server-5b21d3ea/student-profile/:studentId/notify-approval", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    const { adminNotes } = await c.req.json();
    
    const profile = await kv.get(`student-profile:${studentId}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    const user = await kv.get(`user:${studentId}`);
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    const message = `অভিনন্দন ${profile.formData?.fullName || user.name}! আপনার প্রোফাইল অনুমোদিত হয়েছে। এখন আপনি Talent Tutor প্ল্যাটফর্মের সব ফিচার ব্যবহার করতে পারবেন।${adminNotes ? `\\n\\nএডমিন মন্তব্য: ${adminNotes}` : ''}`;
    
    // Send notification via both channels
    const notificationData = {
      userId: studentId,
      type: 'profile_approved',
      channel: 'both',
      subject: 'প্রোফাইল অনুমোদিত - Talent Tutor',
      message,
      data: {
        profileStatus: 'approved',
        approvedAt: new Date().toISOString(),
        adminNotes
      }
    };
    
    const response = await fetch(
      `${c.req.url.split('/student-profile')[0]}/notifications/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData)
      }
    );
    
    return c.json({ success: true, message: 'Approval notification sent' });
  } catch (error) {
    console.error('Send approval notification error:', error);
    return c.json({ error: 'Failed to send approval notification' }, 500);
  }
});

// Send notification when profile needs update
app.post("/make-server-5b21d3ea/student-profile/:studentId/notify-update-needed", async (c) => {
  try {
    const studentId = c.req.param('studentId');
    const { adminNotes } = await c.req.json();
    
    const profile = await kv.get(`student-profile:${studentId}`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }
    
    const user = await kv.get(`user:${studentId}`);
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    const message = `প্রিয় ${profile.formData?.fullName || user.name}, আপনার প্রোফাইলে কিছু আপডেট প্রয়োজন। দয়া করে লগইন করে প্রোফাইল আপডেট করুন।${adminNotes ? `\\n\\nএডমিন মন্তব্য: ${adminNotes}` : ''}`;
    
    // Send notification via both channels
    const notificationData = {
      userId: studentId,
      type: 'profile_needs_update',
      channel: 'both',
      subject: 'প্রোফাইল আপডেট প্রয়োজন - Talent Tutor',
      message,
      data: {
        profileStatus: 'needs_update',
        requestedAt: new Date().toISOString(),
        adminNotes
      }
    };
    
    const response = await fetch(
      `${c.req.url.split('/student-profile')[0]}/notifications/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData)
      }
    );
    
    return c.json({ success: true, message: 'Update notification sent' });
  } catch (error) {
    console.error('Send update notification error:', error);
    return c.json({ error: 'Failed to send update notification' }, 500);
  }
});

// Health check endpoint
app.get("/make-server-5b21d3ea/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== DONOR MANAGEMENT ====================

// Get donor available applications (filtered by donor type)
app.get("/make-server-5b21d3ea/donor/:donorId/available-applications", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    console.log(`🔍 Fetching applications for donor: ${donorId}`);
    
    // Get donor info to check donor type
    const donor = await kv.get(`user:${donorId}`);
    console.log(`👤 Donor found:`, donor ? `${donor.name} (${donor.donorType})` : 'Not found');
    
    if (!donor || donor.role !== 'donor') {
      console.error(`❌ Donor not found or invalid role: ${donorId}`);
      return c.json({ error: 'Donor not found' }, 404);
    }
    
    // Get all student profiles that are approved
    const approvedProfiles = await kv.getByPrefix('student-profile:');
    console.log(`📚 Total student profiles found: ${approvedProfiles.length}`);
    
    const filteredProfiles = approvedProfiles
      .map(p => p.value)
      .filter(profile => {
        if (!profile) {
          console.log(`⚠️ Null profile found`);
          return false;
        }
        
        if (profile.status !== 'approved') {
          console.log(`⏭️ Skipping profile ${profile.studentId} - status: ${profile.status}`);
          return false;
        }
        
        // Filter by donor type
        if (donor.donorType === 'materials') {
          // Materials donors can only see applications for books/materials
          const needsType = profile.formData?.needsType;
          const isMatch = needsType === 'শিক্ষা উপকরণ' || needsType === 'materials';
          console.log(`📘 Materials donor - Profile ${profile.studentId} needsType: ${needsType}, match: ${isMatch}`);
          return isMatch;
        } else if (donor.donorType === 'zakat') {
          // Zakat donors can see all types
          console.log(`💰 Zakat donor - Including profile ${profile.studentId}`);
          return true;
        }
        
        console.log(`✅ Including profile ${profile.studentId} - default case`);
        return true;
      });
    
    console.log(`✅ Filtered profiles count: ${filteredProfiles.length}`);
    
    // Format applications for display
    const applications = filteredProfiles.map(profile => {
      const app = {
        id: profile.studentId || Math.random().toString(),
        studentName: profile.formData?.fullName || 'Unknown',
        applicationType: profile.formData?.needsType || 'যাকাত সাহায্য',
        class: profile.formData?.currentClass,
        school: profile.formData?.school,
        address: profile.formData?.address || profile.formData?.district,
        reason: profile.formData?.whyNeedHelp,
        amountNeeded: profile.formData?.amountNeeded || '5000',
        status: profile.status,
        appliedDate: profile.submittedAt || profile.createdAt,
        approvedDate: profile.reviewedAt,
        monthlyIncome: profile.formData?.monthlyIncome,
        familyMembers: profile.formData?.familyMembers,
      };
      console.log(`📄 Application: ${app.studentName} - ${app.applicationType}`);
      return app;
    });
    
    console.log(`🎉 Returning ${applications.length} applications for ${donor.donorType} donor`);
    
    return c.json({ 
      success: true, 
      applications,
      donorType: donor.donorType,
      totalCount: applications.length
    });
  } catch (error) {
    console.error('❌ Get donor applications error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ 
      error: 'Failed to fetch applications',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get donor profile
app.get("/make-server-5b21d3ea/donor/:donorId", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    const donor = await kv.get(`user:${donorId}`);
    
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }
    
    const { password: _, ...donorWithoutPassword } = donor;
    return c.json({ success: true, donor: donorWithoutPassword });
  } catch (error) {
    console.error('Get donor profile error:', error);
    return c.json({ error: 'Failed to get donor profile' }, 500);
  }
});

// Get donor donations history
app.get("/make-server-5b21d3ea/donor/:donorId/donations", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    
    const donationsKey = `donations:donor:${donorId}`;
    const donationIds = await kv.get(donationsKey) || [];
    
    const donations = await Promise.all(
      donationIds.map(async (id: string) => await kv.get(`donation:${id}`))
    );
    
    return c.json({ 
      success: true, 
      donations: donations.filter(d => d !== null) 
    });
  } catch (error) {
    console.error('Get donor donations error:', error);
    return c.json({ error: 'Failed to get donations' }, 500);
  }
});

// Get donor impact metrics
app.get("/make-server-5b21d3ea/donor/:donorId/impact", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    
    const donationsKey = `donations:donor:${donorId}`;
    const donationIds = await kv.get(donationsKey) || [];
    
    const donations = await Promise.all(
      donationIds.map(async (id: string) => await kv.get(`donation:${id}`))
    );
    
    const validDonations = donations.filter(d => d !== null);
    
    const totalDonated = validDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
    const studentsHelped = new Set(validDonations.map(d => d.studentId)).size;
    const booksDonated = validDonations.filter(d => d.type === 'materials').length;
    
    return c.json({ 
      success: true, 
      impact: {
        totalDonated,
        studentsHelped,
        booksDonated,
        totalDonations: validDonations.length
      }
    });
  } catch (error) {
    console.error('Get donor impact error:', error);
    return c.json({ error: 'Failed to get impact metrics' }, 500);
  }
});

// Update donor profile
app.put("/make-server-5b21d3ea/donor/:donorId", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    const updates = await c.req.json();
    
    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }
    
    const updatedDonor = {
      ...donor,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`user:${donorId}`, updatedDonor);
    
    const { password: _, ...donorWithoutPassword } = updatedDonor;
    return c.json({ success: true, donor: donorWithoutPassword });
  } catch (error) {
    console.error('Update donor profile error:', error);
    return c.json({ error: 'Failed to update donor profile' }, 500);
  }
});

// Make donation
app.post("/make-server-5b21d3ea/donor/:donorId/donate", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    const { studentId, amount, type, items, message } = await c.req.json();
    
    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }
    
    const donationId = `donation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const donation = {
      id: donationId,
      donorId,
      studentId,
      amount: amount || 0,
      type, // 'zakat' or 'materials'
      items: items || [],
      message: message || '',
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`donation:${donationId}`, donation);
    
    // Add to donor's donations
    const donorDonationsKey = `donations:donor:${donorId}`;
    const donorDonations = await kv.get(donorDonationsKey) || [];
    donorDonations.push(donationId);
    await kv.set(donorDonationsKey, donorDonations);
    
    // Add to student's received donations
    const studentDonationsKey = `donations:student:${studentId}`;
    const studentDonations = await kv.get(studentDonationsKey) || [];
    studentDonations.push(donationId);
    await kv.set(studentDonationsKey, studentDonations);
    
    // Update donor's total donated
    donor.totalDonated = (donor.totalDonated || 0) + (amount || 0);
    if (type === 'materials') {
      donor.booksDonated = (donor.booksDonated || 0) + (items?.length || 0);
    }
    await kv.set(`user:${donorId}`, donor);
    
    return c.json({ success: true, donation });
  } catch (error) {
    console.error('Make donation error:', error);
    return c.json({ error: 'Failed to make donation' }, 500);
  }
});

// ==================== TUITION POSTS & APPLICATIONS ====================

// Create tuition post
app.post("/make-server-5b21d3ea/tuition-posts", async (c) => {
  try {
    const postData = await c.req.json();
    const postId = `tuition-post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const post = {
      id: postId,
      ...postData,
      createdAt: new Date().toISOString(),
      status: 'active',
      applications: []
    };
    
    await kv.set(`tuition-post:${postId}`, post);
    
    // Add to guardian's posts
    const guardianPostsKey = `tuition-posts:guardian:${postData.guardianId}`;
    const guardianPosts = await kv.get(guardianPostsKey) || [];
    guardianPosts.push(postId);
    await kv.set(guardianPostsKey, guardianPosts);
    
    // Add to all posts
    const allPostsKey = 'tuition-posts:all';
    const allPosts = await kv.get(allPostsKey) || [];
    allPosts.push(postId);
    await kv.set(allPostsKey, allPosts);
    
    return c.json({ success: true, post });
  } catch (error) {
    console.error('Create tuition post error:', error);
    return c.json({ error: 'Failed to create tuition post' }, 500);
  }
});

// Get guardian's tuition posts
app.get("/make-server-5b21d3ea/tuition-posts/guardian/:guardianId", async (c) => {
  try {
    const guardianId = c.req.param('guardianId');
    
    const guardianPostsKey = `tuition-posts:guardian:${guardianId}`;
    const postIds = await kv.get(guardianPostsKey) || [];
    
    const posts = await Promise.all(
      postIds.map(async (id: string) => await kv.get(`tuition-post:${id}`))
    );
    
    return c.json({ success: true, posts: posts.filter(p => p !== null) });
  } catch (error) {
    console.error('Get guardian posts error:', error);
    return c.json({ error: 'Failed to get posts' }, 500);
  }
});

// Apply to tuition post
app.post("/make-server-5b21d3ea/tuition-posts/:postId/apply", async (c) => {
  try {
    const postId = c.req.param('postId');
    const applicationData = await c.req.json();
    
    const post = await kv.get(`tuition-post:${postId}`);
    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }
    
    const applicationId = `application-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const application = {
      id: applicationId,
      postId,
      ...applicationData,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };
    
    await kv.set(`application:${applicationId}`, application);
    
    // Add to post's applications
    post.applications = post.applications || [];
    post.applications.push(applicationId);
    await kv.set(`tuition-post:${postId}`, post);
    
    // Add to teacher's applications
    const teacherAppsKey = `applications:teacher:${applicationData.teacherId}`;
    const teacherApps = await kv.get(teacherAppsKey) || [];
    teacherApps.push(applicationId);
    await kv.set(teacherAppsKey, teacherApps);
    
    return c.json({ success: true, application });
  } catch (error) {
    console.error('Apply to post error:', error);
    return c.json({ error: 'Failed to apply' }, 500);
  }
});

// Get applications for a tuition post
app.get("/make-server-5b21d3ea/tuition-posts/:postId/applications", async (c) => {
  try {
    const postId = c.req.param('postId');
    console.log('Fetching applications for post:', postId);
    
    const post = await kv.get(`tuition-post:${postId}`);
    console.log('Post found:', post);
    
    if (!post) {
      console.log('Post not found, returning empty applications');
      // Return empty array instead of error
      return c.json({ success: true, applications: [] });
    }
    
    const applicationIds = post.applications || [];
    console.log('Application IDs:', applicationIds);
    
    if (applicationIds.length === 0) {
      return c.json({ success: true, applications: [] });
    }
    
    const applications = await Promise.all(
      applicationIds.map(async (id: string) => {
        const app = await kv.get(`application:${id}`);
        if (app) {
          // Get teacher info
          const teacher = await kv.get(`user:${app.teacherId}`);
          return {
            ...app,
            teacherInfo: teacher ? {
              name: teacher.name,
              email: teacher.email,
              phone: teacher.phone,
              subjects: teacher.subjects,
              experience: teacher.experience,
              rating: teacher.rating || 4.5
            } : null
          };
        }
        return null;
      })
    );
    
    const filteredApplications = applications.filter(a => a !== null);
    console.log('Returning applications:', filteredApplications.length);
    
    return c.json({ success: true, applications: filteredApplications });
  } catch (error) {
    console.error('Get applications error:', error);
    // Return empty array instead of error
    return c.json({ success: true, applications: [], error: String(error) });
  }
});

// Update application status (shortlist/reject)
app.put("/make-server-5b21d3ea/applications/:applicationId/status", async (c) => {
  try {
    const applicationId = c.req.param('applicationId');
    const { status, guardianNotes } = await c.req.json();
    
    const application = await kv.get(`application:${applicationId}`);
    if (!application) {
      return c.json({ error: 'Application not found' }, 404);
    }
    
    application.status = status;
    application.guardianNotes = guardianNotes || '';
    application.updatedAt = new Date().toISOString();
    
    await kv.set(`application:${applicationId}`, application);
    
    // Send notification to teacher
    const notificationMessage = status === 'shortlisted' 
      ? `আপনার আবেদন শর্টলিস্ট করা হয়েছে! Guardian শীঘ্রই আপনার সাথে যোগাযোগ করবেন।`
      : `আপনার আবেদন প্রত্যাখ্যান করা হয়েছে। ${guardianNotes}`;
    
    await fetch(
      `${c.req.url.split('/applications')[0]}/notifications/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: application.teacherId,
          type: 'application_status',
          channel: 'both',
          subject: status === 'shortlisted' ? 'আবেদন শর্টলিস্ট' : 'আবেদন প্রত্যাখ্যান',
          message: notificationMessage,
          data: { applicationId, status }
        })
      }
    );
    
    return c.json({ success: true, application });
  } catch (error) {
    console.error('Update application status error:', error);
    return c.json({ error: 'Failed to update application status' }, 500);
  }
});

// Hire teacher
app.post("/make-server-5b21d3ea/hire-teacher", async (c) => {
  try {
    const { guardianId, teacherId, tuitionPostId, subject, fee, schedule } = await c.req.json();
    
    if (!guardianId || !teacherId) {
      return c.json({ error: 'Guardian ID and Teacher ID required' }, 400);
    }
    
    // Get guardian
    const guardian = await kv.get(`user:${guardianId}`);
    if (!guardian) {
      return c.json({ error: 'Guardian not found' }, 404);
    }
    
    // Check credits
    if (guardian.credits < 25) {
      return c.json({ error: 'Insufficient credits' }, 400);
    }
    
    // Get teacher
    const teacher = await kv.get(`user:${teacherId}`);
    if (!teacher) {
      return c.json({ error: 'Teacher not found' }, 404);
    }
    
    // Deduct credits
    guardian.credits -= 25;
    await kv.set(`user:${guardianId}`, guardian);
    
    // Create contract
    const contractId = `contract-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const contract = {
      id: contractId,
      guardianId,
      teacherId,
      tuitionPostId,
      guardianName: guardian.name,
      teacherName: teacher.name,
      subject,
      fee,
      schedule,
      status: 'active',
      createdAt: new Date().toISOString(),
      startDate: new Date().toISOString(),
      paymentStatus: 'pending'
    };
    
    await kv.set(`contract:${contractId}`, contract);
    
    // Add to guardian's contracts
    const guardianContractsKey = `contracts:guardian:${guardianId}`;
    const guardianContracts = await kv.get(guardianContractsKey) || [];
    guardianContracts.push(contractId);
    await kv.set(guardianContractsKey, guardianContracts);
    
    // Add to teacher's contracts
    const teacherContractsKey = `contracts:teacher:${teacherId}`;
    const teacherContracts = await kv.get(teacherContractsKey) || [];
    teacherContracts.push(contractId);
    await kv.set(teacherContractsKey, teacherContracts);
    
    // Send notification to teacher
    await fetch(
      `${c.req.url.split('/hire-teacher')[0]}/notifications/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: teacherId,
          type: 'general',
          channel: 'both',
          subject: 'নতুন টিউশন চুক্তি',
          message: `অভিনন্দন! ${guardian.name} আপনাকে ${subject} বিষয়ে টিউশনের জন্য নিয়োগ দিয়েছেন। মাসিক ফি: ৳${fee}`,
          data: { contractId, guardianName: guardian.name }
        })
      }
    );
    
    return c.json({ success: true, contract, creditsDeducted: 25, remainingCredits: guardian.credits });
  } catch (error) {
    console.error('Hire teacher error:', error);
    return c.json({ error: 'Failed to hire teacher' }, 500);
  }
});

// Get guardian's contracts
app.get("/make-server-5b21d3ea/contracts/guardian/:guardianId", async (c) => {
  try {
    const guardianId = c.req.param('guardianId');
    
    const contractsKey = `contracts:guardian:${guardianId}`;
    const contractIds = await kv.get(contractsKey) || [];
    
    const contracts = await Promise.all(
      contractIds.map(async (id: string) => await kv.get(`contract:${id}`))
    );
    
    return c.json({ success: true, contracts: contracts.filter(c => c !== null) });
  } catch (error) {
    console.error('Get guardian contracts error:', error);
    return c.json({ error: 'Failed to get contracts' }, 500);
  }
});

// Pay teacher
app.post("/make-server-5b21d3ea/contracts/:contractId/pay", async (c) => {
  try {
    const contractId = c.req.param('contractId');
    const { amount, paymentMethod } = await c.req.json();
    
    const contract = await kv.get(`contract:${contractId}`);
    if (!contract) {
      return c.json({ error: 'Contract not found' }, 404);
    }
    
    // Create payment record
    const paymentId = `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const payment = {
      id: paymentId,
      contractId,
      guardianId: contract.guardianId,
      teacherId: contract.teacherId,
      amount,
      paymentMethod,
      status: 'completed',
      paidAt: new Date().toISOString()
    };
    
    await kv.set(`payment:${paymentId}`, payment);
    
    // Update contract payment status
    contract.paymentStatus = 'paid';
    contract.lastPaymentDate = new Date().toISOString();
    await kv.set(`contract:${contractId}`, contract);
    
    // Add credits to teacher
    const teacher = await kv.get(`user:${contract.teacherId}`);
    if (teacher) {
      teacher.credits = (teacher.credits || 0) + Math.floor(amount / 10); // 10 taka = 1 credit
      await kv.set(`user:${contract.teacherId}`, teacher);
    }
    
    // Send notification to teacher
    await fetch(
      `${c.req.url.split('/contracts')[0]}/notifications/send`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: contract.teacherId,
          type: 'general',
          channel: 'both',
          subject: 'পেমেন্ট প্রাপ্তি',
          message: `আপনি ৳${amount} টাকা পেমেন্ট পেয়েছেন। চুক্তি ID: ${contractId}`,
          data: { paymentId, amount }
        })
      }
    );
    
    return c.json({ success: true, payment });
  } catch (error) {
    console.error('Pay teacher error:', error);
    return c.json({ error: 'Failed to process payment' }, 500);
  }
});

// Get subscription history
app.get("/make-server-5b21d3ea/subscriptions/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    
    const subscriptionsKey = `subscriptions:user:${userId}`;
    const subscriptionIds = await kv.get(subscriptionsKey) || [];
    
    const subscriptions = await Promise.all(
      subscriptionIds.map(async (id: string) => await kv.get(`subscription:${id}`))
    );
    
    return c.json({ success: true, subscriptions: subscriptions.filter(s => s !== null) });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    return c.json({ error: 'Failed to get subscriptions' }, 500);
  }
});

// Create subscription
app.post("/make-server-5b21d3ea/subscriptions", async (c) => {
  try {
    const { userId, plan, amount, duration } = await c.req.json();
    
    const subscriptionId = `subscription-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const subscription = {
      id: subscriptionId,
      userId,
      plan,
      amount,
      duration,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`subscription:${subscriptionId}`, subscription);
    
    // Add to user's subscriptions
    const subscriptionsKey = `subscriptions:user:${userId}`;
    const subscriptions = await kv.get(subscriptionsKey) || [];
    subscriptions.push(subscriptionId);
    await kv.set(subscriptionsKey, subscriptions);
    
    // Update user's subscription status
    const user = await kv.get(`user:${userId}`);
    if (user) {
      user.subscription = plan;
      user.subscriptionExpiry = subscription.endDate;
      await kv.set(`user:${userId}`, user);
    }
    
    return c.json({ success: true, subscription });
  } catch (error) {
    console.error('Create subscription error:', error);
    return c.json({ error: 'Failed to create subscription' }, 500);
  }
});

// ==================== CREDIT MANAGEMENT SYSTEM ====================

// Initialize user credits (called on signup)
app.post("/make-server-5b21d3ea/credits/initialize", async (c) => {
  try {
    const { userId, userType } = await c.req.json();
    
    if (!userId || !userType) {
      return c.json({ error: 'userId and userType required' }, 400);
    }

    // Check if credits already exist
    const existingCredits = await kv.get(`credits:${userId}`);
    if (existingCredits) {
      return c.json({ success: true, credits: existingCredits, message: 'Credits already initialized' });
    }

    // Determine signup bonus based on userType
    let signupBonus = 0;
    if (userType === 'teacher') signupBonus = 50;
    else if (userType === 'guardian') signupBonus = 100;
    else if (userType === 'student') signupBonus = 0;

    // Create initial credit record
    const credits = {
      userId,
      userType,
      currentBalance: signupBonus,
      totalEarned: signupBonus,
      totalSpent: 0,
      totalPurchased: 0,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await kv.set(`credits:${userId}`, credits);

    // Create signup transaction if bonus > 0
    if (signupBonus > 0) {
      const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const transaction = {
        id: transactionId,
        userId,
        type: 'earned',
        amount: signupBonus,
        balance: signupBonus,
        description: 'সাইনআপ বোনাস (ফ্রি ট্রায়াল)',
        descriptionEn: 'Signup Bonus (Free Trial)',
        timestamp: new Date().toISOString(),
        relatedTo: null,
        packageId: null
      };

      // Store transaction
      await kv.set(`transaction:${transactionId}`, transaction);
      
      // Add to user's transaction list
      const userTransactionsKey = `transactions:${userId}`;
      const userTransactions = await kv.get(userTransactionsKey) || [];
      userTransactions.unshift(transactionId);
      await kv.set(userTransactionsKey, userTransactions);
    }

    return c.json({ success: true, credits, signupBonus });
  } catch (error) {
    console.error('Initialize credits error:', error);
    return c.json({ error: 'Failed to initialize credits' }, 500);
  }
});

// Get user credits
app.get("/make-server-5b21d3ea/credits/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const credits = await kv.get(`credits:${userId}`);
    
    if (!credits) {
      return c.json({ error: 'Credits not found' }, 404);
    }

    return c.json({ success: true, credits });
  } catch (error) {
    console.error('Get credits error:', error);
    return c.json({ error: 'Failed to get credits' }, 500);
  }
});

// Deduct credits
app.post("/make-server-5b21d3ea/credits/deduct", async (c) => {
  try {
    const { userId, amount, description, descriptionEn, relatedTo } = await c.req.json();
    
    if (!userId || !amount || !description) {
      return c.json({ error: 'userId, amount, and description required' }, 400);
    }

    // Get current credits
    const credits = await kv.get(`credits:${userId}`);
    if (!credits) {
      return c.json({ error: 'Credits not found' }, 404);
    }

    // Check sufficient balance
    if (credits.currentBalance < amount) {
      return c.json({ 
        error: 'Insufficient credits', 
        currentBalance: credits.currentBalance,
        required: amount 
      }, 400);
    }

    // Create transaction
    const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const transaction = {
      id: transactionId,
      userId,
      type: 'spent',
      amount: -Math.abs(amount),
      balance: credits.currentBalance - amount,
      description,
      descriptionEn: descriptionEn || description,
      timestamp: new Date().toISOString(),
      relatedTo: relatedTo || null,
      packageId: null
    };

    // Update credits
    credits.currentBalance -= amount;
    credits.totalSpent += amount;
    credits.lastUpdated = new Date().toISOString();

    // Save everything
    await kv.set(`credits:${userId}`, credits);
    await kv.set(`transaction:${transactionId}`, transaction);

    // Add to user's transaction list
    const userTransactionsKey = `transactions:${userId}`;
    const userTransactions = await kv.get(userTransactionsKey) || [];
    userTransactions.unshift(transactionId);
    await kv.set(userTransactionsKey, userTransactions);

    // Update user's credits field
    const user = await kv.get(`user:${userId}`);
    if (user) {
      user.credits = credits.currentBalance;
      await kv.set(`user:${userId}`, user);
    }

    return c.json({ success: true, transaction, credits });
  } catch (error) {
    console.error('Deduct credits error:', error);
    return c.json({ error: 'Failed to deduct credits' }, 500);
  }
});

// Add credits (purchase, bonus, earned)
app.post("/make-server-5b21d3ea/credits/add", async (c) => {
  try {
    const { userId, amount, type, description, descriptionEn, packageId, adminNote } = await c.req.json();
    
    if (!userId || !amount || !type || !description) {
      return c.json({ error: 'userId, amount, type, and description required' }, 400);
    }

    // Get current credits
    const credits = await kv.get(`credits:${userId}`);
    if (!credits) {
      return c.json({ error: 'Credits not found' }, 404);
    }

    // Create transaction
    const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const transaction = {
      id: transactionId,
      userId,
      type,
      amount: Math.abs(amount),
      balance: credits.currentBalance + Math.abs(amount),
      description,
      descriptionEn: descriptionEn || description,
      timestamp: new Date().toISOString(),
      relatedTo: null,
      packageId: packageId || null,
      adminNote: adminNote || null
    };

    // Update credits
    credits.currentBalance += Math.abs(amount);
    credits.totalEarned += Math.abs(amount);
    if (type === 'purchased') {
      credits.totalPurchased += Math.abs(amount);
    }
    credits.lastUpdated = new Date().toISOString();

    // Save everything
    await kv.set(`credits:${userId}`, credits);
    await kv.set(`transaction:${transactionId}`, transaction);

    // Add to user's transaction list
    const userTransactionsKey = `transactions:${userId}`;
    const userTransactions = await kv.get(userTransactionsKey) || [];
    userTransactions.unshift(transactionId);
    await kv.set(userTransactionsKey, userTransactions);

    // Update user's credits field
    const user = await kv.get(`user:${userId}`);
    if (user) {
      user.credits = credits.currentBalance;
      await kv.set(`user:${userId}`, user);
    }

    return c.json({ success: true, transaction, credits });
  } catch (error) {
    console.error('Add credits error:', error);
    return c.json({ error: 'Failed to add credits' }, 500);
  }
});

// Get user transactions
app.get("/make-server-5b21d3ea/credits/transactions/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');

    const userTransactionsKey = `transactions:${userId}`;
    const transactionIds = await kv.get(userTransactionsKey) || [];

    // Paginate
    const paginatedIds = transactionIds.slice(offset, offset + limit);

    // Fetch transactions
    const transactions = await Promise.all(
      paginatedIds.map(async (id: string) => await kv.get(`transaction:${id}`))
    );

    const validTransactions = transactions.filter(t => t !== null);

    return c.json({ 
      success: true, 
      transactions: validTransactions,
      total: transactionIds.length,
      offset,
      limit
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return c.json({ error: 'Failed to get transactions' }, 500);
  }
});

// Purchase credit package
app.post("/make-server-5b21d3ea/credits/purchase-package", async (c) => {
  try {
    const { userId, packageId, paymentMethod, transactionRef } = await c.req.json();
    
    if (!userId || !packageId) {
      return c.json({ error: 'userId and packageId required' }, 400);
    }

    // Package definitions (matching frontend)
    const packages: Record<string, any> = {
      'teacher-standard': { credits: 30, bonus: 10, price: 200, name: 'স্ট্যান্ডার্ড', nameEn: 'Standard' },
      'teacher-premium': { credits: 70, bonus: 30, price: 500, name: 'প্রিমিয়াম', nameEn: 'Premium' },
      'guardian-standard': { credits: 30, bonus: 10, price: 200, name: 'স্ট্যান্ডার্ড', nameEn: 'Standard' },
      'guardian-premium': { credits: 150, bonus: 50, price: 1000, name: 'প্রিমিয়াম', nameEn: 'Premium' }
    };

    const pkg = packages[packageId];
    if (!pkg) {
      return c.json({ error: 'Invalid package' }, 400);
    }

    const totalCredits = pkg.credits + pkg.bonus;
    const description = `${pkg.name} প্যাকেজ ক্রয় (+${totalCredits} ক্রেডিট)`;
    const descriptionEn = `${pkg.nameEn} Package Purchase (+${totalCredits} Credits)`;

    // Add credits
    const credits = await kv.get(`credits:${userId}`);
    if (!credits) {
      return c.json({ error: 'Credits not found' }, 404);
    }

    // Create transaction
    const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const transaction = {
      id: transactionId,
      userId,
      type: 'purchased',
      amount: totalCredits,
      balance: credits.currentBalance + totalCredits,
      description,
      descriptionEn,
      timestamp: new Date().toISOString(),
      relatedTo: null,
      packageId,
      paymentMethod: paymentMethod || 'unknown',
      transactionRef: transactionRef || null,
      price: pkg.price
    };

    // Update credits
    credits.currentBalance += totalCredits;
    credits.totalEarned += totalCredits;
    credits.totalPurchased += totalCredits;
    credits.lastUpdated = new Date().toISOString();

    // Save everything
    await kv.set(`credits:${userId}`, credits);
    await kv.set(`transaction:${transactionId}`, transaction);

    // Add to user's transaction list
    const userTransactionsKey = `transactions:${userId}`;
    const userTransactions = await kv.get(userTransactionsKey) || [];
    userTransactions.unshift(transactionId);
    await kv.set(userTransactionsKey, userTransactions);

    // Update user's credits field
    const user = await kv.get(`user:${userId}`);
    if (user) {
      user.credits = credits.currentBalance;
      await kv.set(`user:${userId}`, user);
    }

    return c.json({ success: true, transaction, credits, package: pkg });
  } catch (error) {
    console.error('Purchase package error:', error);
    return c.json({ error: 'Failed to purchase package' }, 500);
  }
});

// Admin: Get all user credits
app.get("/make-server-5b21d3ea/admin/credits/all", async (c) => {
  try {
    const allCredits = await kv.getByPrefix('credits:');
    
    const creditsData = allCredits
      .filter(c => c.value && c.value.userId)
      .map(c => c.value);

    return c.json({ success: true, credits: creditsData, total: creditsData.length });
  } catch (error) {
    console.error('Get all credits error:', error);
    return c.json({ error: 'Failed to get all credits' }, 500);
  }
});

// Admin: Set user credits (override)
app.put("/make-server-5b21d3ea/admin/credits/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const { newBalance, adminNote } = await c.req.json();
    
    if (newBalance === undefined) {
      return c.json({ error: 'newBalance required' }, 400);
    }

    // Get current credits
    const credits = await kv.get(`credits:${userId}`);
    if (!credits) {
      return c.json({ error: 'Credits not found' }, 404);
    }

    const difference = newBalance - credits.currentBalance;
    const type = difference > 0 ? 'admin_added' : 'admin_deducted';
    const amount = Math.abs(difference);

    if (difference !== 0) {
      // Create transaction
      const transactionId = `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const transaction = {
        id: transactionId,
        userId,
        type,
        amount: difference > 0 ? amount : -amount,
        balance: newBalance,
        description: `অ্যাডমিন দ্বারা ${difference > 0 ? 'যোগ' : 'বাদ'} করা হয়েছে`,
        descriptionEn: `${difference > 0 ? 'Added' : 'Deducted'} by Admin`,
        timestamp: new Date().toISOString(),
        relatedTo: null,
        packageId: null,
        adminNote: adminNote || null
      };

      // Update credits
      credits.currentBalance = newBalance;
      if (difference > 0) {
        credits.totalEarned += amount;
      } else {
        credits.totalSpent += amount;
      }
      credits.lastUpdated = new Date().toISOString();

      // Save everything
      await kv.set(`credits:${userId}`, credits);
      await kv.set(`transaction:${transactionId}`, transaction);

      // Add to user's transaction list
      const userTransactionsKey = `transactions:${userId}`;
      const userTransactions = await kv.get(userTransactionsKey) || [];
      userTransactions.unshift(transactionId);
      await kv.set(userTransactionsKey, userTransactions);

      // Update user's credits field
      const user = await kv.get(`user:${userId}`);
      if (user) {
        user.credits = credits.currentBalance;
        await kv.set(`user:${userId}`, user);
      }

      return c.json({ success: true, transaction, credits });
    }

    return c.json({ success: true, credits, message: 'No change needed' });
  } catch (error) {
    console.error('Admin set credits error:', error);
    return c.json({ error: 'Failed to set credits' }, 500);
  }
});

// ==================== DEMO DATA INITIALIZATION ====================

// Initialize demo data for testing
app.post("/make-server-5b21d3ea/init-demo-data", async (c) => {
  try {
    console.log('🚀 Initializing demo data...');
    
    // Check if demo data already exists
    const demoFlag = await kv.get('demo:initialized');
    if (demoFlag) {
      console.log('ℹ️ Demo data already initialized');
      return c.json({ 
        success: true, 
        message: 'Demo data already initialized',
        note: 'You can use existing demo accounts'
      });
    }

    const createdUsers: any[] = [];
    const now = new Date().toISOString();

    // ==================== CREATE DEMO DONORS ====================
    
    // Zakat Donor
    const zakatDonor = {
      id: 'donor-zakat-demo',
      name: 'Karim Ahmed',
      email: 'donor.zakat@demo.com',
      phone: '01700000001',
      password: 'demo123',
      role: 'donor',
      donorType: 'zakat',
      credits: 0,
      status: 'active',
      isProfileComplete: true,
      isVerified: true,
      createdAt: now,
      updatedAt: now
    };
    await kv.set(`user:${zakatDonor.id}`, zakatDonor);
    await kv.set(`user:email:${zakatDonor.email}`, zakatDonor.id);
    await kv.set(`user:phone:${zakatDonor.phone}`, zakatDonor.id);
    createdUsers.push(zakatDonor);
    console.log('✅ Created zakat donor');

    // Materials Donor
    const materialsDonor = {
      id: 'donor-materials-demo',
      name: 'Fatima Rahman',
      email: 'donor.materials@demo.com',
      phone: '01700000002',
      password: 'demo123',
      role: 'donor',
      donorType: 'materials',
      credits: 0,
      status: 'active',
      isProfileComplete: true,
      isVerified: true,
      createdAt: now,
      updatedAt: now
    };
    await kv.set(`user:${materialsDonor.id}`, materialsDonor);
    await kv.set(`user:email:${materialsDonor.email}`, materialsDonor.id);
    await kv.set(`user:phone:${materialsDonor.phone}`, materialsDonor.id);
    createdUsers.push(materialsDonor);
    console.log('✅ Created materials donor');

    // ==================== CREATE DEMO STUDENTS WITH PROFILES ====================
    
    const studentProfiles = [
      {
        studentId: 'student-demo-1',
        studentName: 'আফরিন খাতুন',
        email: 'student1@demo.com',
        phone: '01800000001',
        formData: {
          fullName: 'আফরিন খাতুন',
          currentClass: 'অষ্টম শ্রেণী',
          school: 'ঢাকা সরকারি উচ্চ বিদ্যালয়',
          address: 'মিরপুর, ঢাকা',
          district: 'ঢাকা',
          needsType: 'যাকাত সাহায্য',
          amountNeeded: '5000',
          monthlyIncome: '8000',
          familyMembers: '6',
          whyNeedHelp: 'আমার বাবা একজন রিকশাচালক। পরিবারে ৬ জন সদস্য কিন্তু আয় খুবই কম। পড়াশোনা চালিয়ে যাওয়ার জন্য আর্থিক সাহায্য প্রয়োজন।',
          documents: []
        },
        status: 'approved',
        submittedAt: now,
        reviewedAt: now,
        reviewedBy: 'admin',
        adminComment: 'Approved for assistance',
        createdAt: now
      },
      {
        studentId: 'student-demo-2',
        studentName: 'রাফি হোসেন',
        email: 'student2@demo.com',
        phone: '01800000002',
        formData: {
          fullName: 'রাফি হোসেন',
          currentClass: 'নবম শ্রেণী',
          school: 'চট্টগ্রাম কলেজিয়েট স্কুল',
          address: 'নাসিরাবাদ, চট্টগ্রাম',
          district: 'চট্টগ্রাম',
          needsType: 'শিক্ষা উপকরণ',
          amountNeeded: '3000',
          monthlyIncome: '12000',
          familyMembers: '4',
          whyNeedHelp: 'নতুন ক্লাসের জন্য বই এবং খাতা কিনতে পারছি না। পরিবারের আর্থিক অবস্থা ভালো নয়।',
          documents: []
        },
        status: 'approved',
        submittedAt: now,
        reviewedAt: now,
        reviewedBy: 'admin',
        adminComment: 'Approved for materials assistance',
        createdAt: now
      },
      {
        studentId: 'student-demo-3',
        studentName: 'সুমাইয়া আক্তার',
        email: 'student3@demo.com',
        phone: '01800000003',
        formData: {
          fullName: 'সুমাইয়া আক্তার',
          currentClass: 'দশম শ্রেণী',
          school: 'সিলেট সরকারি বালিকা উচ্চ বিদ্যালয়',
          address: 'জালালাবাদ, সিলেট',
          district: 'সিলেট',
          needsType: 'যাকাত সাহায্য',
          amountNeeded: '7000',
          monthlyIncome: '6000',
          familyMembers: '5',
          whyNeedHelp: 'আমার বাবা অসুস্থ এবং কাজ করতে পারেন না। মা গৃহকর্মী হিসেবে কাজ করেন। SSC পরীক্ষার জন্য সাহায্য দরকার।',
          documents: []
        },
        status: 'approved',
        submittedAt: now,
        reviewedAt: now,
        reviewedBy: 'admin',
        adminComment: 'Urgent assistance required',
        createdAt: now
      },
      {
        studentId: 'student-demo-4',
        studentName: 'তানভীর রহমান',
        email: 'student4@demo.com',
        phone: '01800000004',
        formData: {
          fullName: 'তানভীর রহমান',
          currentClass: 'সপ্তম শ্রেণী',
          school: 'রাজশাহী জিলা স্কুল',
          address: 'রাজপা��়া, রাজশাহী',
          district: 'রাজশাহী',
          needsType: 'শিক্ষা উপকরণ',
          amountNeeded: '2500',
          monthlyIncome: '10000',
          familyMembers: '4',
          whyNeedHelp: 'স্কুলের বই এবং ইউনিফর্ম কিনতে পারছি না। বাবা একজন ছোট দোকানদার।',
          documents: []
        },
        status: 'approved',
        submittedAt: now,
        reviewedAt: now,
        reviewedBy: 'admin',
        adminComment: 'Approved for books and uniform',
        createdAt: now
      },
      {
        studentId: 'student-demo-5',
        studentName: 'নুসরাত জাহান',
        email: 'student5@demo.com',
        phone: '01800000005',
        formData: {
          fullName: 'নুসরাত জাহান',
          currentClass: 'ষষ্ঠ শ্রেণী',
          school: 'খুলনা জিলা স্কুল',
          address: 'দৌলতপুর, খুলনা',
          district: 'খুলনা',
          needsType: 'যাকাত সাহায্য',
          amountNeeded: '4000',
          monthlyIncome: '7500',
          familyMembers: '7',
          whyNeedHelp: 'বড় পরিবার কিন্তু আয় কম। পড়াশোনার খরচ বহন করা কঠিন হয়ে যাচ্ছে।',
          documents: []
        },
        status: 'approved',
        submittedAt: now,
        reviewedAt: now,
        reviewedBy: 'admin',
        adminComment: 'Approved',
        createdAt: now
      }
    ];

    // Create student users and profiles
    for (const profile of studentProfiles) {
      // Create student user
      const student = {
        id: profile.studentId,
        name: profile.studentName,
        email: profile.email,
        phone: profile.phone,
        password: 'demo123',
        role: 'student',
        credits: 0,
        status: 'active',
        isProfileComplete: true,
        isVerified: true,
        createdAt: now,
        updatedAt: now
      };
      
      await kv.set(`user:${student.id}`, student);
      await kv.set(`user:email:${student.email}`, student.id);
      await kv.set(`user:phone:${student.phone}`, student.id);
      
      // Create student profile
      await kv.set(`student-profile:${profile.studentId}`, profile);
      
      createdUsers.push(student);
      console.log(`✅ Created student: ${profile.studentName}`);
    }

    // ==================== CREATE DEMO TEACHERS ====================
    
    const teacher = {
      id: 'teacher-demo-1',
      name: 'মোহাম্মদ হাসান',
      email: 'teacher@demo.com',
      phone: '01900000001',
      password: 'demo123',
      role: 'teacher',
      credits: 50,
      status: 'active',
      isProfileComplete: true,
      isVerified: true,
      createdAt: now,
      updatedAt: now
    };
    await kv.set(`user:${teacher.id}`, teacher);
    await kv.set(`user:email:${teacher.email}`, teacher.id);
    await kv.set(`user:phone:${teacher.phone}`, teacher.id);
    createdUsers.push(teacher);
    console.log('✅ Created teacher');

    // ==================== CREATE DEMO GUARDIAN ====================
    
    const guardian = {
      id: 'guardian-demo-1',
      name: 'সাবিনা খানম',
      email: 'guardian@demo.com',
      phone: '01600000001',
      password: 'demo123',
      role: 'guardian',
      credits: 100,
      status: 'active',
      isProfileComplete: true,
      isVerified: true,
      createdAt: now,
      updatedAt: now
    };
    await kv.set(`user:${guardian.id}`, guardian);
    await kv.set(`user:email:${guardian.email}`, guardian.id);
    await kv.set(`user:phone:${guardian.phone}`, guardian.id);
    createdUsers.push(guardian);
    console.log('✅ Created guardian');

    // ==================== CREATE DEMO ADMIN ====================
    
    const admin = {
      id: 'admin-demo-1',
      name: 'Admin User',
      email: 'admin@demo.com',
      phone: '01500000001',
      password: 'admin123',
      role: 'admin',
      credits: 0,
      status: 'active',
      isProfileComplete: true,
      isVerified: true,
      createdAt: now,
      updatedAt: now
    };
    await kv.set(`user:${admin.id}`, admin);
    await kv.set(`user:email:${admin.email}`, admin.id);
    await kv.set(`user:phone:${admin.phone}`, admin.id);
    createdUsers.push(admin);
    console.log('✅ Created admin');

    // Mark demo data as initialized
    await kv.set('demo:initialized', { initialized: true, timestamp: now });
    
    console.log('🎉 Demo data initialization complete!');
    console.log(`📊 Created ${createdUsers.length} users and ${studentProfiles.length} student profiles`);

    return c.json({
      success: true,
      message: 'Demo data initialized successfully',
      users: createdUsers.map(u => ({ id: u.id, name: u.name, role: u.role, email: u.email })),
      studentProfiles: studentProfiles.length,
      credentials: {
        zakatDonor: { email: 'donor.zakat@demo.com', password: 'demo123' },
        materialsDonor: { email: 'donor.materials@demo.com', password: 'demo123' },
        teacher: { email: 'teacher@demo.com', password: 'demo123' },
        guardian: { email: 'guardian@demo.com', password: 'demo123' },
        admin: { email: 'admin@demo.com', password: 'admin123' },
        students: 'student1-5@demo.com (password: demo123)'
      }
    });
  } catch (error) {
    console.error('❌ Initialize demo data error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return c.json({ 
      error: 'Failed to initialize demo data',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ==================== PAYMENT SYSTEM ====================

// Process payment (universal payment handler)
app.post("/make-server-5b21d3ea/payments/process", async (c) => {
  try {
    const { 
      userId, 
      amount, 
      paymentMethod, 
      purpose, 
      description,
      metadata 
    } = await c.req.json();
    
    if (!userId || !amount || !paymentMethod || !purpose) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Generate payment ID
    const paymentId = `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create payment record
    const payment = {
      id: paymentId,
      userId,
      amount,
      paymentMethod, // 'bkash', 'nagad', 'rocket', 'card', 'bank'
      purpose, // 'credit_purchase', 'donation', 'subscription', 'tuition_payment'
      description: description || '',
      status: 'completed', // In production: 'pending' -> 'completed' / 'failed'
      transactionRef: `TXN${Date.now()}`,
      metadata: metadata || {},
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };
    
    // Save payment
    await kv.set(`payment:${paymentId}`, payment);
    
    // Add to user's payment history
    const userPaymentsKey = `payments:user:${userId}`;
    const userPayments = await kv.get(userPaymentsKey) || [];
    userPayments.unshift(paymentId);
    await kv.set(userPaymentsKey, userPayments);
    
    // Add to global payment list
    const allPaymentsKey = 'payments:all';
    const allPayments = await kv.get(allPaymentsKey) || [];
    allPayments.unshift(paymentId);
    await kv.set(allPaymentsKey, allPayments);
    
    // Purpose-specific handling
    if (purpose === 'credit_purchase' && metadata?.packageId) {
      // Process credit purchase
      const packages: Record<string, any> = {
        'teacher-standard': { credits: 30, bonus: 10, price: 200 },
        'teacher-premium': { credits: 70, bonus: 30, price: 500 },
        'guardian-standard': { credits: 30, bonus: 10, price: 200 },
        'guardian-premium': { credits: 150, bonus: 50, price: 1000 }
      };
      
      const pkg = packages[metadata.packageId];
      if (pkg) {
        const totalCredits = pkg.credits + pkg.bonus;
        
        // Add credits to user
        const credits = await kv.get(`credits:${userId}`);
        if (credits) {
          credits.currentBalance += totalCredits;
          credits.totalEarned += totalCredits;
          credits.totalPurchased += totalCredits;
          credits.lastUpdated = new Date().toISOString();
          await kv.set(`credits:${userId}`, credits);
          
          // Update user object
          const user = await kv.get(`user:${userId}`);
          if (user) {
            user.credits = credits.currentBalance;
            await kv.set(`user:${userId}`, user);
          }
        }
      }
    } else if (purpose === 'donation') {
      // Handle donation
      const donationId = `donation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const donation = {
        id: donationId,
        donorId: userId,
        amount,
        type: metadata?.donationType || 'money',
        paymentId,
        status: 'completed',
        isAnonymous: metadata?.isAnonymous || false,
        donorName: metadata?.donorName || 'Anonymous',
        createdAt: new Date().toISOString()
      };
      
      await kv.set(`donation:${donationId}`, donation);
      
      // Add to donor's donations
      const donorDonationsKey = `donations:donor:${userId}`;
      const donorDonations = await kv.get(donorDonationsKey) || [];
      donorDonations.unshift(donationId);
      await kv.set(donorDonationsKey, donorDonations);
      
      payment.donationId = donationId;
    }
    
    return c.json({ 
      success: true, 
      payment,
      message: 'Payment processed successfully' 
    });
  } catch (error) {
    console.error('Process payment error:', error);
    return c.json({ error: 'Failed to process payment', details: String(error) }, 500);
  }
});

// Get user payment history
app.get("/make-server-5b21d3ea/payments/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    
    const userPaymentsKey = `payments:user:${userId}`;
    const paymentIds = await kv.get(userPaymentsKey) || [];
    
    // Paginate
    const paginatedIds = paymentIds.slice(offset, offset + limit);
    
    // Fetch payments
    const payments = await Promise.all(
      paginatedIds.map(async (id: string) => await kv.get(`payment:${id}`))
    );
    
    const validPayments = payments.filter(p => p !== null);
    
    return c.json({ 
      success: true, 
      payments: validPayments,
      total: paymentIds.length,
      offset,
      limit
    });
  } catch (error) {
    console.error('Get user payments error:', error);
    return c.json({ error: 'Failed to get payments' }, 500);
  }
});

// Get payment by ID
app.get("/make-server-5b21d3ea/payments/:paymentId", async (c) => {
  try {
    const paymentId = c.req.param('paymentId');
    
    const payment = await kv.get(`payment:${paymentId}`);
    
    if (!payment) {
      return c.json({ error: 'Payment not found' }, 404);
    }
    
    return c.json({ success: true, payment });
  } catch (error) {
    console.error('Get payment error:', error);
    return c.json({ error: 'Failed to get payment' }, 500);
  }
});

// Admin: Get all payments
app.get("/make-server-5b21d3ea/admin/payments/all", async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '100');
    const offset = parseInt(c.req.query('offset') || '0');
    const purpose = c.req.query('purpose'); // Filter by purpose
    
    const allPaymentsKey = 'payments:all';
    const paymentIds = await kv.get(allPaymentsKey) || [];
    
    // Fetch all payments
    const payments = await Promise.all(
      paymentIds.map(async (id: string) => await kv.get(`payment:${id}`))
    );
    
    let validPayments = payments.filter(p => p !== null);
    
    // Filter by purpose if specified
    if (purpose) {
      validPayments = validPayments.filter(p => p.purpose === purpose);
    }
    
    // Paginate
    const paginatedPayments = validPayments.slice(offset, offset + limit);
    
    // Calculate statistics
    const stats = {
      total: validPayments.length,
      totalAmount: validPayments.reduce((sum, p) => sum + (p.amount || 0), 0),
      byPurpose: validPayments.reduce((acc: any, p) => {
        acc[p.purpose] = (acc[p.purpose] || 0) + 1;
        return acc;
      }, {}),
      byMethod: validPayments.reduce((acc: any, p) => {
        acc[p.paymentMethod] = (acc[p.paymentMethod] || 0) + 1;
        return acc;
      }, {}),
      byStatus: validPayments.reduce((acc: any, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {})
    };
    
    return c.json({ 
      success: true, 
      payments: paginatedPayments,
      stats,
      total: validPayments.length,
      offset,
      limit
    });
  } catch (error) {
    console.error('Admin get all payments error:', error);
    return c.json({ error: 'Failed to get payments' }, 500);
  }
});

// Admin: Get payment statistics
app.get("/make-server-5b21d3ea/admin/payments/stats", async (c) => {
  try {
    const period = c.req.query('period') || '30'; // days
    const allPaymentsKey = 'payments:all';
    const paymentIds = await kv.get(allPaymentsKey) || [];
    
    const payments = await Promise.all(
      paymentIds.map(async (id: string) => await kv.get(`payment:${id}`))
    );
    
    const validPayments = payments.filter(p => p !== null);
    
    // Filter by period
    const periodDays = parseInt(period);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - periodDays);
    
    const recentPayments = validPayments.filter(p => 
      new Date(p.createdAt) >= cutoffDate
    );
    
    const stats = {
      period: `Last ${periodDays} days`,
      totalPayments: recentPayments.length,
      totalAmount: recentPayments.reduce((sum, p) => sum + (p.amount || 0), 0),
      averageAmount: recentPayments.length > 0 
        ? recentPayments.reduce((sum, p) => sum + (p.amount || 0), 0) / recentPayments.length 
        : 0,
      byPurpose: recentPayments.reduce((acc: any, p) => {
        if (!acc[p.purpose]) {
          acc[p.purpose] = { count: 0, amount: 0 };
        }
        acc[p.purpose].count++;
        acc[p.purpose].amount += p.amount || 0;
        return acc;
      }, {}),
      byMethod: recentPayments.reduce((acc: any, p) => {
        acc[p.paymentMethod] = (acc[p.paymentMethod] || 0) + 1;
        return acc;
      }, {}),
      successRate: recentPayments.length > 0
        ? (recentPayments.filter(p => p.status === 'completed').length / recentPayments.length) * 100
        : 0,
      dailyTrend: calculateDailyTrend(recentPayments, periodDays)
    };
    
    return c.json({ success: true, stats });
  } catch (error) {
    console.error('Get payment stats error:', error);
    return c.json({ error: 'Failed to get payment statistics' }, 500);
  }
});

// Helper function for daily trend
function calculateDailyTrend(payments: any[], days: number) {
  const trend: any[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayPayments = payments.filter(p => 
      p.createdAt.split('T')[0] === dateStr
    );
    
    trend.push({
      date: dateStr,
      count: dayPayments.length,
      amount: dayPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
    });
  }
  
  return trend;
}

// Admin: Update payment status
app.put("/make-server-5b21d3ea/admin/payments/:paymentId/status", async (c) => {
  try {
    const paymentId = c.req.param('paymentId');
    const { status, adminNote } = await c.req.json();
    
    if (!status || !['pending', 'completed', 'failed', 'refunded'].includes(status)) {
      return c.json({ error: 'Invalid status' }, 400);
    }
    
    const payment = await kv.get(`payment:${paymentId}`);
    if (!payment) {
      return c.json({ error: 'Payment not found' }, 404);
    }
    
    payment.status = status;
    payment.adminNote = adminNote || '';
    payment.updatedAt = new Date().toISOString();
    
    if (status === 'completed' && !payment.completedAt) {
      payment.completedAt = new Date().toISOString();
    }
    
    await kv.set(`payment:${paymentId}`, payment);
    
    return c.json({ success: true, payment });
  } catch (error) {
    console.error('Update payment status error:', error);
    return c.json({ error: 'Failed to update payment status' }, 500);
  }
});

// ==================== PHYSICAL DONATIONS ====================

// Submit physical donation (books, uniform, stationery)
app.post("/make-server-5b21d3ea/physical-donations/submit", async (c) => {
  try {
    const donationData = await c.req.json();
    const { donorId, donationType } = donationData;
    
    if (!donorId || !donationType) {
      return c.json({ error: 'Donor ID and donation type required' }, 400);
    }
    
    // Generate donation ID
    const donationId = `physical-donation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const donation = {
      id: donationId,
      ...donationData,
      status: 'pending_approval',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    // Save donation
    await kv.set(`physical-donation:${donationId}`, donation);
    
    // Add to donor's donation list
    const donorDonationsKey = `physical-donations:donor:${donorId}`;
    const donorDonations = await kv.get(donorDonationsKey) || [];
    donorDonations.unshift(donationId);
    await kv.set(donorDonationsKey, donorDonations);
    
    // Add to pending approval list
    const pendingKey = `physical-donations:pending`;
    const pending = await kv.get(pendingKey) || [];
    pending.unshift(donationId);
    await kv.set(pendingKey, pending);
    
    return c.json({ success: true, donation });
  } catch (error) {
    console.error('Submit physical donation error:', error);
    return c.json({ error: 'Failed to submit donation' }, 500);
  }
});

// Get donor physical donations
app.get("/make-server-5b21d3ea/physical-donations/donor/:donorId", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    
    const donorDonationsKey = `physical-donations:donor:${donorId}`;
    const donationIds = await kv.get(donorDonationsKey) || [];
    
    const donations = await Promise.all(
      donationIds.map(async (id: string) => await kv.get(`physical-donation:${id}`))
    );
    
    return c.json({ 
      success: true, 
      donations: donations.filter(d => d !== null) 
    });
  } catch (error) {
    console.error('Get donor physical donations error:', error);
    return c.json({ error: 'Failed to get donations' }, 500);
  }
});

// Admin: Get pending physical donations
app.get("/make-server-5b21d3ea/admin/physical-donations/pending", async (c) => {
  try {
    const pendingKey = `physical-donations:pending`;
    const donationIds = await kv.get(pendingKey) || [];
    
    const donations = await Promise.all(
      donationIds.map(async (id: string) => await kv.get(`physical-donation:${id}`))
    );
    
    return c.json({ 
      success: true, 
      donations: donations.filter(d => d !== null) 
    });
  } catch (error) {
    console.error('Get pending physical donations error:', error);
    return c.json({ error: 'Failed to get pending donations' }, 500);
  }
});

// Admin: Update physical donation status
app.put("/make-server-5b21d3ea/admin/physical-donations/:donationId/status", async (c) => {
  try {
    const donationId = c.req.param('donationId');
    const { status, adminNote } = await c.req.json();
    
    const donation = await kv.get(`physical-donation:${donationId}`);
    if (!donation) {
      return c.json({ error: 'Donation not found' }, 404);
    }
    
    donation.status = status;
    donation.adminNote = adminNote || '';
    donation.reviewedAt = new Date().toISOString();
    
    await kv.set(`physical-donation:${donationId}`, donation);
    
    // Remove from pending if approved/rejected
    if (status !== 'pending_approval') {
      const pendingKey = `physical-donations:pending`;
      const pending = await kv.get(pendingKey) || [];
      const updated = pending.filter((id: string) => id !== donationId);
      await kv.set(pendingKey, updated);
      
      // Add to approved/rejected list
      const statusKey = `physical-donations:${status}`;
      const statusList = await kv.get(statusKey) || [];
      statusList.unshift(donationId);
      await kv.set(statusKey, statusList);
    }
    
    return c.json({ success: true, donation });
  } catch (error) {
    console.error('Update physical donation status error:', error);
    return c.json({ error: 'Failed to update status' }, 500);
  }
});

// Health check endpoint
app.get("/make-server-5b21d3ea/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Manual database table initialization endpoint (for emergency use)
app.post("/make-server-5b21d3ea/admin/init-table", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Try to create the table using a simple insert/error approach
    const { error } = await supabase
      .from("kv_store_5b21d3ea")
      .select("key")
      .limit(1);

    if (error) {
      return c.json({ 
        success: false, 
        error: "Table does not exist",
        message: "Please create the table manually in Supabase Dashboard",
        sql: `
CREATE TABLE IF NOT EXISTS public.kv_store_5b21d3ea (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_kv_store_5b21d3ea_key ON public.kv_store_5b21d3ea(key);

ALTER TABLE public.kv_store_5b21d3ea ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" 
ON public.kv_store_5b21d3ea
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

GRANT ALL ON public.kv_store_5b21d3ea TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kv_store_5b21d3ea TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kv_store_5b21d3ea TO authenticated;
        `.trim()
      }, 500);
    }

    return c.json({ 
      success: true, 
      message: "Table kv_store_5b21d3ea exists and is accessible" 
    });
  } catch (error) {
    console.error('Table initialization check error:', error);
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ==================== GOOGLE MAPS API KEY ====================

// Get Google Maps API Key (secure endpoint)
app.get("/make-server-5b21d3ea/config/google-maps-api-key", (c) => {
  try {
    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY') || '';
    
    if (!apiKey) {
      console.warn('⚠️ GOOGLE_MAPS_API_KEY environment variable not set');
      return c.json({ error: 'API key not configured' }, 500);
    }
    
    return c.json({ success: true, apiKey });
  } catch (error) {
    console.error('Get Google Maps API key error:', error);
    return c.json({ error: 'Failed to get API key' }, 500);
  }
});

// ==================== DONOR MANAGEMENT ====================

// Get all donors (Admin only)
app.get("/make-server-5b21d3ea/donors", async (c) => {
  try {
    const donorType = c.req.query('type'); // 'zakat' | 'materials' | 'all'
    const status = c.req.query('status'); // 'active' | 'inactive'
    const verified = c.req.query('verified'); // 'true' | 'false'

    // Get all users with donor role
    const users = await kv.getByPrefix('user:');
    const donors = users
      .filter(u => u.value && u.value.role === 'donor')
      .map(u => u.value);

    let filteredDonors = donors;

    // Filter by donor type
    if (donorType && donorType !== 'all') {
      filteredDonors = filteredDonors.filter(d => d.donorType === donorType);
    }

    // Filter by status
    if (status) {
      filteredDonors = filteredDonors.filter(d => d.status === status);
    }

    // Filter by verified
    if (verified) {
      const isVerified = verified === 'true';
      filteredDonors = filteredDonors.filter(d => d.isVerified === isVerified);
    }

    // Calculate donor stats
    const donorsWithStats = await Promise.all(filteredDonors.map(async (donor) => {
      const donations = await kv.get(`donor:${donor.id}:donations`) || [];
      const totalDonations = donations.reduce((sum: number, d: any) => sum + (d.amount || 0), 0);
      const donationCount = donations.length;

      return {
        ...donor,
        totalDonations,
        donationCount,
        lastDonation: donations.length > 0 ? donations[donations.length - 1].date : null,
        tier: calculateDonorTier(totalDonations, donationCount)
      };
    }));

    return c.json({ 
      success: true, 
      donors: donorsWithStats,
      count: donorsWithStats.length 
    });
  } catch (error) {
    console.error('Get donors error:', error);
    return c.json({ error: 'Failed to get donors' }, 500);
  }
});

// Get single donor details
app.get("/make-server-5b21d3ea/donors/:donorId", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    
    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }

    // Get donor's donations
    const donations = await kv.get(`donor:${donorId}:donations`) || [];
    
    // Get matched students
    const matchedStudents = await kv.get(`donor:${donorId}:students`) || [];

    const totalDonations = donations.reduce((sum: number, d: any) => sum + (d.amount || 0), 0);
    const donationCount = donations.length;

    return c.json({
      success: true,
      donor: {
        ...donor,
        totalDonations,
        donationCount,
        tier: calculateDonorTier(totalDonations, donationCount),
        donations,
        matchedStudents
      }
    });
  } catch (error) {
    console.error('Get donor error:', error);
    return c.json({ error: 'Failed to get donor' }, 500);
  }
});

// Update donor profile
app.put("/make-server-5b21d3ea/donors/:donorId", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    const updates = await c.req.json();

    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }

    const updatedDonor = {
      ...donor,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${donorId}`, updatedDonor);

    return c.json({ success: true, donor: updatedDonor });
  } catch (error) {
    console.error('Update donor error:', error);
    return c.json({ error: 'Failed to update donor' }, 500);
  }
});

// Verify donor (Admin only)
app.post("/make-server-5b21d3ea/donors/:donorId/verify", async (c) => {
  try {
    const donorId = c.req.param('donorId');

    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }

    donor.isVerified = true;
    donor.verifiedAt = new Date().toISOString();
    donor.updatedAt = new Date().toISOString();

    await kv.set(`user:${donorId}`, donor);

    return c.json({ success: true, donor });
  } catch (error) {
    console.error('Verify donor error:', error);
    return c.json({ error: 'Failed to verify donor' }, 500);
  }
});

// Get available student applications for donor
app.get("/make-server-5b21d3ea/donor/:donorId/available-applications", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    
    // Get donor info to check type
    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }

    // Get approved applications
    const approvedKey = 'applications:approved';
    const applicationIds = await kv.get(approvedKey) || [];
    
    const applications = await Promise.all(
      applicationIds.map(async (id: string) => await kv.get(`application:${id}`))
    );

    let filteredApps = applications.filter(a => a !== null && a.status === 'approved');

    // Filter by donor type
    if (donor.donorType === 'materials') {
      // Material donors only see material requests
      filteredApps = filteredApps.filter(a => a.applicationType === 'materials');
    }
    // Zakat donors see all applications

    return c.json({ 
      success: true, 
      applications: filteredApps,
      count: filteredApps.length 
    });
  } catch (error) {
    console.error('Get available applications error:', error);
    return c.json({ error: 'Failed to get applications' }, 500);
  }
});

// Record donation
app.post("/make-server-5b21d3ea/donors/:donorId/donations", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    const donationData = await c.req.json();

    const donor = await kv.get(`user:${donorId}`);
    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }

    const donationId = `donation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const donation = {
      id: donationId,
      donorId,
      donorName: donor.name,
      studentId: donationData.studentId,
      studentName: donationData.studentName,
      type: donationData.type, // 'money' | 'books' | 'materials'
      amount: donationData.amount || 0,
      items: donationData.items || [],
      message: donationData.message || '',
      date: new Date().toISOString(),
      status: 'pending', // pending, verified, completed
      receiptNumber: `DON${Date.now().toString().slice(-8)}`
    };

    // Save donation
    await kv.set(`donation:${donationId}`, donation);

    // Add to donor's donations list
    const donorDonationsKey = `donor:${donorId}:donations`;
    const donorDonations = await kv.get(donorDonationsKey) || [];
    donorDonations.push(donation);
    await kv.set(donorDonationsKey, donorDonations);

    // Add to student's received donations
    if (donationData.studentId) {
      const studentDonationsKey = `student:${donationData.studentId}:donations`;
      const studentDonations = await kv.get(studentDonationsKey) || [];
      studentDonations.push(donation);
      await kv.set(studentDonationsKey, studentDonations);
    }

    // Add to all donations list
    const allDonationsKey = 'donations:all';
    const allDonations = await kv.get(allDonationsKey) || [];
    allDonations.push(donationId);
    await kv.set(allDonationsKey, allDonations);

    return c.json({ success: true, donation });
  } catch (error) {
    console.error('Record donation error:', error);
    return c.json({ error: 'Failed to record donation' }, 500);
  }
});

// Get donor's donation history
app.get("/make-server-5b21d3ea/donors/:donorId/donations", async (c) => {
  try {
    const donorId = c.req.param('donorId');
    
    const donations = await kv.get(`donor:${donorId}:donations`) || [];

    return c.json({ success: true, donations });
  } catch (error) {
    console.error('Get donor donations error:', error);
    return c.json({ error: 'Failed to get donations' }, 500);
  }
});

// Get all donations (Admin)
app.get("/make-server-5b21d3ea/donations", async (c) => {
  try {
    const status = c.req.query('status');
    const type = c.req.query('type');
    
    const allDonationsKey = 'donations:all';
    const donationIds = await kv.get(allDonationsKey) || [];
    
    const donations = await Promise.all(
      donationIds.map(async (id: string) => await kv.get(`donation:${id}`))
    );

    let filteredDonations = donations.filter(d => d !== null);

    if (status) {
      filteredDonations = filteredDonations.filter(d => d.status === status);
    }

    if (type) {
      filteredDonations = filteredDonations.filter(d => d.type === type);
    }

    return c.json({ success: true, donations: filteredDonations });
  } catch (error) {
    console.error('Get all donations error:', error);
    return c.json({ error: 'Failed to get donations' }, 500);
  }
});

// Update donation status (Admin)
app.put("/make-server-5b21d3ea/donations/:donationId", async (c) => {
  try {
    const donationId = c.req.param('donationId');
    const updates = await c.req.json();

    const donation = await kv.get(`donation:${donationId}`);
    if (!donation) {
      return c.json({ error: 'Donation not found' }, 404);
    }

    const updatedDonation = {
      ...donation,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`donation:${donationId}`, updatedDonation);

    // Update in donor's list
    if (donation.donorId) {
      const donorDonationsKey = `donor:${donation.donorId}:donations`;
      const donorDonations = await kv.get(donorDonationsKey) || [];
      const updatedDonorDonations = donorDonations.map((d: any) => 
        d.id === donationId ? updatedDonation : d
      );
      await kv.set(donorDonationsKey, updatedDonorDonations);
    }

    return c.json({ success: true, donation: updatedDonation });
  } catch (error) {
    console.error('Update donation error:', error);
    return c.json({ error: 'Failed to update donation' }, 500);
  }
});

// Match donor with student request
app.post("/make-server-5b21d3ea/donations/match", async (c) => {
  try {
    const { donorId, studentId, requestId, applicationId } = await c.req.json();

    const donor = await kv.get(`user:${donorId}`);
    const student = await kv.get(`user:${studentId}`);

    if (!donor || donor.role !== 'donor') {
      return c.json({ error: 'Donor not found' }, 404);
    }

    if (!student) {
      return c.json({ error: 'Student not found' }, 404);
    }

    // Create match record
    const matchId = `match-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const match = {
      id: matchId,
      donorId,
      donorName: donor.name,
      studentId,
      studentName: student.name,
      requestId: requestId || null,
      applicationId: applicationId || null,
      matchedAt: new Date().toISOString(),
      status: 'matched'
    };

    await kv.set(`match:${matchId}`, match);

    // Add to donor's matched students
    const donorStudentsKey = `donor:${donorId}:students`;
    const donorStudents = await kv.get(donorStudentsKey) || [];
    donorStudents.push(studentId);
    await kv.set(donorStudentsKey, donorStudents);

    // Update application if provided
    if (applicationId) {
      const application = await kv.get(`application:${applicationId}`);
      if (application) {
        application.status = 'matched';
        application.donorId = donorId;
        application.matchedAt = new Date().toISOString();
        await kv.set(`application:${applicationId}`, application);
      }
    }

    return c.json({ success: true, match });
  } catch (error) {
    console.error('Match donor error:', error);
    return c.json({ error: 'Failed to match donor' }, 500);
  }
});

// Get donor statistics (Admin dashboard)
app.get("/make-server-5b21d3ea/donors/statistics", async (c) => {
  try {
    const users = await kv.getByPrefix('user:');
    const donors = users
      .filter(u => u.value && u.value.role === 'donor')
      .map(u => u.value);

    const zakatDonors = donors.filter(d => d.donorType === 'zakat').length;
    const materialDonors = donors.filter(d => d.donorType === 'materials').length;
    const activeDonors = donors.filter(d => d.status === 'active').length;
    const verifiedDonors = donors.filter(d => d.isVerified).length;

    // Get all donations
    const allDonationsKey = 'donations:all';
    const donationIds = await kv.get(allDonationsKey) || [];
    const donations = await Promise.all(
      donationIds.map(async (id: string) => await kv.get(`donation:${id}`))
    );

    const totalDonations = donations.reduce((sum, d) => sum + (d?.amount || 0), 0);
    const completedDonations = donations.filter(d => d?.status === 'completed').length;
    const pendingDonations = donations.filter(d => d?.status === 'pending').length;

    return c.json({
      success: true,
      statistics: {
        totalDonors: donors.length,
        zakatDonors,
        materialDonors,
        activeDonors,
        verifiedDonors,
        totalDonations,
        totalDonationCount: donations.length,
        completedDonations,
        pendingDonations,
        averageDonation: donations.length > 0 ? Math.round(totalDonations / donations.length) : 0
      }
    });
  } catch (error) {
    console.error('Get donor statistics error:', error);
    return c.json({ error: 'Failed to get statistics' }, 500);
  }
});

// Helper function to calculate donor tier
function calculateDonorTier(totalDonations: number, donationCount: number): string {
  if (totalDonations >= 100000 || donationCount >= 20) return 'Platinum';
  if (totalDonations >= 50000 || donationCount >= 10) return 'Gold';
  if (totalDonations >= 20000 || donationCount >= 5) return 'Silver';
  return 'Bronze';
}

// Mount data routes (Tuition Posts, Teachers, Blog, Library)
app.route("/make-server-5b21d3ea", dataRoutes);

// Final startup message
console.log('='.repeat(60));
console.log('✅ Server initialized successfully!');
console.log('📍 All routes mounted');
console.log('🔗 All routes: /make-server-5b21d3ea/*');
console.log('='.repeat(60));

// Start server
Deno.serve(app.fetch);
