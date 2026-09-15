export const verifyEmailTemplate = (name, email, otpCode) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body { background: #f5f7fa; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: #071d49; color: #ffffff; padding: 20px; text-align: center; font-size: 22px; font-weight: bold; }
    .content { padding: 25px; color: #334155; line-height: 1.6; }
    .code-box { background: #f5f7fa; border: 2px dashed #f56600; padding: 12px; font-size: 24px; font-weight: bold; text-align: center; border-radius: 8px; margin: 20px 0; color: #071d49; }
    .footer { font-size: 13px; color: #64748b; text-align: center; padding: 15px; border-top: 1px solid #e2e8f0; background: #f5f7fa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Verify Your Email</div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>Thanks for signing up! Please use the verification code below to confirm your email address:</p>
      <div class="code-box">${otpCode}</div> 
      <p>Or you can click the button below to verify your email directly:</p>
      <p><a href="${
        process.env.NEXT_PUBLIC_BASE_URL
      }/otp-verification?email=${email}" class="btn">Verify Email</a></p>
      <p>This code will expire soon, so make sure to use it promptly.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Ihrachane. All rights reserved.</div>
  </div>
</body>
</html>
`;

export const resetPasswordTemplate = (name, email, code) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body { background: #f5f7fa; font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: #f56600; color: #ffffff; padding: 20px; text-align: center; font-size: 22px; font-weight: bold; }
    .content { padding: 25px; color: #334155; line-height: 1.6; }
    .code-box { background: #f5f7fa; border: 2px dashed #d95400; padding: 12px; font-size: 24px; font-weight: bold; text-align: center; border-radius: 8px; margin: 20px 0; color: #071d49; }
    .btn { display: inline-block; margin: 20px 0; padding: 12px 20px; background: #f56600; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; }
    .btn:hover { background: #d95400; }
    .footer { font-size: 13px; color: #64748b; text-align: center; padding: 15px; border-top: 1px solid #e2e8f0; background: #f5f7fa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Reset Your Password</div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Use the code below to continue:</p>
      <div class="code-box">${code}</div>
      <p>Or you can click the button below to reset your password directly:</p>
      <p><a href="${
        process.env.NEXT_PUBLIC_BASE_URL
      }/reset-password?email=${email}" class="btn">Reset Password</a></p>
      <p>If you did not request this, please ignore this message.</p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Ihrachane. All rights reserved.</div>
  </div>
</body>
</html>
`;

export const verifyEmailTemplate1 = (name, email, otpCode) => `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your IHRACHANE Account</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f7fa;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto; max-width: 600px;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #ffffff; border-top: 4px solid #f56600;">
                <h1 style="margin: 0; color: #f56600; font-size: 28px; font-weight: bold;">IHRACHANE</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; background-color: #ffffff;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td style="padding-bottom: 20px; color: #334155; font-size: 18px; line-height: 1.5;">
                            Hello ${name},
                        </td>
                    </tr> 
                    <tr>
                        <td style="padding-bottom: 20px; color: #334155; font-size: 16px; line-height: 1.5;">
                            Thank you for joining IHRACHANE! To complete your registration, please use the following One-Time Password (OTP) to verify your account.
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 30px; text-align: center;">
                            <div style="display: inline-block; padding: 15px 30px; background-color: #f5f7fa; border: 2px dashed #f56600; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #f56600;">
                                ${otpCode}
                            </div>
                            <p>Or you can click the button below to verify your email directly:</p>
                            <p><a href="${ process.env.NEXT_PUBLIC_BASE_URL}/otp-verification?email=${email}"class="btn">Verify Email</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px; color: #f56600; font-size: 16px; font-weight: bold; text-align: center;">
                            ⏱ This code will expire in 5 minutes
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 20px; color: #64748b; font-size: 14px; line-height: 1.5;">
                            For security reasons, please do not share this code with anyone. If you didn't request this verification, please ignore this email or contact our support team.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #071d49; color: #ffffff; font-size: 12px;">
                <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} IHRACHANE. All rights reserved.</p>
                <p style="margin: 0; color: #64748b;">
                    If you need assistance, please contact our support team
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
