/**
 * Email Templates for Talent Tutor Platform
 * 
 * Professional email templates for various notifications
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Generate donation confirmation email
 */
export function donationConfirmationEmail(data: {
  donorName: string;
  amount: number;
  studentName?: string;
  donationType: string;
  transactionId: string;
  date: string;
}): EmailTemplate {
  const subject = `দান নিশ্চিতকরণ - ${data.transactionId}`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Noto Serif Bengali', serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f43f5e 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 30px; }
        .donation-details { background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { color: #6b7280; }
        .detail-value { font-weight: bold; color: #111827; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: linear-gradient(135deg, #f43f5e 0%, #14b8a6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 দান সফল হয়েছে!</h1>
          <p>আপনার উদারতার জন্য ধন্যবাদ</p>
        </div>
        
        <div class="content">
          <p>প্রিয় ${data.donorName},</p>
          
          <p>আসসালামু আলাইকুম। আপনার দান সফলভাবে সম্পন্ন হয়েছে। আল্লাহ আপনার দানকে কবুল করুন এবং আপনাকে উত্তম প্রতিদান দিন।</p>
          
          <div class="donation-details">
            <h3 style="margin-top: 0;">দানের বিবরণ</h3>
            <div class="detail-row">
              <span class="detail-label">লেনদেন নম্বর:</span>
              <span class="detail-value">${data.transactionId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">দানের ধরন:</span>
              <span class="detail-value">${data.donationType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">পরিমাণ:</span>
              <span class="detail-value">৳${data.amount.toLocaleString('bn-BD')}</span>
            </div>
            ${data.studentName ? `
            <div class="detail-row">
              <span class="detail-label">সুবিধাভোগী:</span>
              <span class="detail-value">${data.studentName}</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">তারিখ:</span>
              <span class="detail-value">${data.date}</span>
            </div>
          </div>
          
          <p>আপনার দান একজন শিক্ষার্থীর জীবন পরিবর্তন করতে সাহায্য করবে। আপনি যে সাহায্য করেছেন তার প্রভাব সম্পর্কে শীঘ্রই আপনাকে জানানো হবে।</p>
          
          <center>
            <a href="#" class="button">ড্যাশবোর্ড দেখুন</a>
          </center>
        </div>
        
        <div class="footer">
          <p><strong>Talent Tutor</strong></p>
          <p>শিক্ষার মাধ্যমে জীবন পরিবর্তন</p>
          <p style="font-size: 12px; margin-top: 15px;">
            এই ইমেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে। অনুগ্রহ করে উত্তর দেবেন না।
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
দান নিশ্চিতকরণ

প্রিয় ${data.donorName},

আসসালামু আলাইকুম। আপনার দান সফলভাবে সম্পন্ন হয়েছে।

দানের বিবরণ:
- লেনদেন নম্বর: ${data.transactionId}
- দানের ধরন: ${data.donationType}
- পরিমাণ: ৳${data.amount.toLocaleString('bn-BD')}
${data.studentName ? `- সুবিধাভোগী: ${data.studentName}\n` : ''}- তারিখ: ${data.date}

আপনার দান একজন শিক্ষার্থীর জীবন পরিবর্তন করতে সাহায্য করবে।

ধন্যবাদ,
Talent Tutor টিম
  `;

  return { subject, html, text };
}

/**
 * Generate application approved email for student
 */
export function applicationApprovedEmail(data: {
  studentName: string;
  applicationType: string;
  approvedDate: string;
  nextSteps?: string;
}): EmailTemplate {
  const subject = `আবেদন অনুমোদিত হয়েছে - Talent Tutor`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Noto Serif Bengali', serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 30px; }
        .success-box { background: #f0fdf4; border: 2px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 অভিনন্দন!</h1>
          <p>আপনার আবেদন অনুমোদিত হয়েছে</p>
        </div>
        
        <div class="content">
          <p>প্রিয় ${data.studentName},</p>
          
          <p>আসসালামু আলাইকুম। আপনার ${data.applicationType} আবেদনটি সফলভাবে অনুমোদিত হয়েছে।</p>
          
          <div class="success-box">
            <h2 style="color: #10b981; margin-top: 0;">✅ আবেদন অনুমোদিত</h2>
            <p>আপনার আবেদন ${data.approvedDate} তারিখে অনুমোদিত হয়েছে।</p>
          </div>
          
          ${data.nextSteps ? `
          <h3>পরবর্তী পদক্ষেপ:</h3>
          <p>${data.nextSteps}</p>
          ` : ''}
          
          <p>শীঘ্রই একজন দাতা আপনার আবেদনে সাড়া দেবেন। অনুগ্রহ করে আপনার ড্যাশবোর্ড নিয়মিত চেক করুন।</p>
        </div>
        
        <div class="footer">
          <p><strong>Talent Tutor</strong></p>
          <p>শিক্ষার মাধ্যমে জীবন পরিবর্তন</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
আবেদন অনুমোদিত

প্রিয় ${data.studentName},

আসসালামু আলাইকুম। আপনার ${data.applicationType} আবেদনটি সফলভাবে অনুমোদিত হয়েছে।

অনুমোদনের তারিখ: ${data.approvedDate}

${data.nextSteps ? `পরবর্তী পদক্ষেপ: ${data.nextSteps}\n\n` : ''}
শীঘ্রই একজন দাতা আপনার আবেদনে সাড়া দেবেন।

ধন্যবাদ,
Talent Tutor টিম
  `;

  return { subject, html, text };
}

/**
 * Generate new donation received email for student
 */
export function donationReceivedEmail(data: {
  studentName: string;
  donorName: string;
  amount?: number;
  items?: string[];
  message?: string;
  anonymous: boolean;
}): EmailTemplate {
  const subject = `নতুন দান প্রাপ্ত হয়েছে - Talent Tutor`;
  
  const displayName = data.anonymous ? 'একজন দাতা' : data.donorName;
  
  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Noto Serif Bengali', serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .donation-box { background: #fef2f2; border-left: 4px solid #f43f5e; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎁 সুসংবাদ!</h1>
          <p>আপনি একটি দান পেয়েছেন</p>
        </div>
        
        <div class="content">
          <p>প্রিয় ${data.studentName},</p>
          
          <p>আসসালামু আলাইকুম। ${displayName} আপনার জন্য একটি দান করেছেন।</p>
          
          <div class="donation-box">
            <h3 style="margin-top: 0;">দানের বিবরণ</h3>
            ${data.amount ? `<p><strong>পরিমাণ:</strong> ৳${data.amount.toLocaleString('bn-BD')}</p>` : ''}
            ${data.items && data.items.length > 0 ? `
              <p><strong>দানকৃত উপকরণ:</strong></p>
              <ul>
                ${data.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            ` : ''}
            ${data.message ? `<p><em>"${data.message}"</em></p>` : ''}
          </div>
          
          <p>এই দান আপনার শিক্ষা ও উন্নতির জন্য ব্যবহার করুন। আল্লাহ আপনার উজ্জ্বল ভবিষ্যত দান করুন।</p>
        </div>
        
        <div class="footer">
          <p><strong>Talent Tutor</strong></p>
          <p>শিক্ষার মাধ্যমে জীবন পরিবর্তন</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
নতুন দান প্রাপ্ত

প্রিয় ${data.studentName},

আসসালামু আলাইকুম। ${displayName} আপনার জন্য একটি দান করেছেন।

${data.amount ? `পরিমাণ: ৳${data.amount.toLocaleString('bn-BD')}\n` : ''}
${data.items && data.items.length > 0 ? `দানকৃত উপকরণ:\n${data.items.map(item => `- ${item}`).join('\n')}\n` : ''}
${data.message ? `বার্তা: "${data.message}"\n` : ''}

এই দান আপনার শিক্ষা ও উন্নতির জন্য ব্যবহার করুন।

ধন্যবাদ,
Talent Tutor টিম
  `;

  return { subject, html, text };
}

/**
 * Generate welcome email for new donor
 */
export function welcomeDonorEmail(data: {
  donorName: string;
  donorType: string;
}): EmailTemplate {
  const subject = `Talent Tutor-এ স্বাগতম!`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Noto Serif Bengali', serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .feature-box { background: #f0f9ff; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 স্বাগতম!</h1>
          <p>Talent Tutor পরিবারে আপনাকে স্বাগতম</p>
        </div>
        
        <div class="content">
          <p>প্রিয় ${data.donorName},</p>
          
          <p>আসসালামু আলাইকুম। Talent Tutor প্ল্যাটফর্মে ${data.donorType} হিসেবে যুক্ত হওয়ার জন্য আপনাকে ধন্যবাদ।</p>
          
          <h3>আপনি যা করতে পারবেন:</h3>
          
          <div class="feature-box">
            ✅ শিক্ষার্থীদের আবেদন দেখুন এবং সাহায্য করুন
          </div>
          <div class="feature-box">
            ✅ আপনার দানের প্রভাব ট্র্যাক করুন
          </div>
          <div class="feature-box">
            ✅ সুবিধাভোগীদের থেকে আপডেট পান
          </div>
          <div class="feature-box">
            ✅ মাসিক রিপোর্ট ও সার্টিফিকেট ডাউনলোড করুন
          </div>
          
          <center>
            <a href="#" class="button">ড্যাশবোর্ড দেখুন</a>
          </center>
          
          <p>আপনার উদারতা অনেক শিক্ষার্থীর জীবন পরিবর্তন করতে সাহায্য করবে। আল্লাহ আপনার দানকে কবুল করুন।</p>
        </div>
        
        <div class="footer">
          <p><strong>Talent Tutor</strong></p>
          <p>শিক্ষার মাধ্যমে জীবন পরিবর্তন</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Talent Tutor-এ স্বাগতম!

প্রিয় ${data.donorName},

আসসালামু আলাইকুম। Talent Tutor প্ল্যাটফর্মে ${data.donorType} হিসেবে যুক্ত হওয়ার জন্য আপনাকে ধন্যবাদ।

আপনি যা করতে পারবেন:
✅ শিক্ষার্থীদের আবেদন দেখুন এবং সাহায্য করুন
✅ আপনার দানের প্রভাব ট্র্যাক করুন
✅ সুবিধাভোগীদের থেকে আপডেট পান
✅ মাসিক রিপোর্ট ও সার্টিফিকেট ডাউনলোড করুন

আপনার উদারতা অনেক শিক্ষার্থীর জীবন পরিবর্তন করতে সাহায্য করবে।

ধন্যবাদ,
Talent Tutor টিম
  `;

  return { subject, html, text };
}

/**
 * Generate monthly impact report email
 */
export function monthlyImpactReportEmail(data: {
  donorName: string;
  month: string;
  totalDonations: number;
  studentsHelped: number;
  itemsDonated?: number;
  topImpact?: string;
}): EmailTemplate {
  const subject = `${data.month} মাসের প্রভাব রিপোর্ট - Talent Tutor`;
  
  const html = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Noto Serif Bengali', serif; background-color: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .stat-box { background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 32px; font-weight: bold; color: #8b5cf6; }
        .stat-label { color: #6b7280; font-size: 14px; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 মাসিক প্রভাব রিপোর্ট</h1>
          <p>${data.month}</p>
        </div>
        
        <div class="content">
          <p>প্রিয় ${data.donorName},</p>
          
          <p>${data.month} মাসে আপনার দানের প্রভাব দেখুন:</p>
          
          <div class="stats-grid">
            <div class="stat-box">
              <div class="stat-number">৳${(data.totalDonations / 1000).toFixed(0)}K</div>
              <div class="stat-label">মোট দান</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">${data.studentsHelped}</div>
              <div class="stat-label">উপকৃত ছাত্র</div>
            </div>
            ${data.itemsDonated ? `
            <div class="stat-box">
              <div class="stat-number">${data.itemsDonated}</div>
              <div class="stat-label">দানকৃত উপকরণ</div>
            </div>
            ` : ''}
          </div>
          
          ${data.topImpact ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">🌟 সবচেয়ে বড় প্রভাব</h3>
            <p>${data.topImpact}</p>
          </div>
          ` : ''}
          
          <p>আপনার উদারতার জন্য ধন্যবাদ। আল্লাহ আপনাকে উত্তম প্রতিদান দিন।</p>
        </div>
        
        <div class="footer">
          <p><strong>Talent Tutor</strong></p>
          <p>শিক্ষার মাধ্যমে জীবন পরিবর্তন</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
মাসিক প্রভাব রিপোর্ট - ${data.month}

প্রিয় ${data.donorName},

${data.month} মাসে আপনার দানের প্রভাব:

- মোট দান: ৳${data.totalDonations.toLocaleString('bn-BD')}
- উপকৃত ছাত্র: ${data.studentsHelped} জন
${data.itemsDonated ? `- দানকৃত উপকরণ: ${data.itemsDonated} টি\n` : ''}
${data.topImpact ? `\nসবচেয়ে বড় প্রভাব:\n${data.topImpact}\n` : ''}

আপনার উদারতার জন্য ধন্যবাদ।

ধন্যবাদ,
Talent Tutor টিম
  `;

  return { subject, html, text };
}
