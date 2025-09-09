package com.JobZilla.utility;

public class Data {
	public static String getMessageBody(String otp, String name) {
		return "<!DOCTYPE html>\n" +
			    "<html lang=\"en\">\n" +
			    "<head>\n" +
			    "  <meta charset=\"UTF-8\">\n" +
			    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
			    "  <title>Your OTP Code</title>\n" +
			    "  <style>\n" +
			    "    body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }\n" +
			    "    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }\n" +
			    "    .header { background-color: #28a745; color: #ffffff; text-align: center; padding: 20px; font-size: 20px; font-weight: bold; }\n" +
			    "    .content { padding: 30px; text-align: center; color: #333333; }\n" +
			    "    .otp { font-size: 28px; font-weight: bold; color: #28a745; margin: 20px 0; }\n" +
			    "    .footer { font-size: 12px; color: #777777; text-align: center; padding: 15px; background: #f9f9f9; }\n" +
			    "  </style>\n" +
			    "</head>\n" +
			    "<body>\n" +
			    "  <div class=\"container\">\n" +
			    "    <div class=\"header\">Your OTP Code</div>\n" +
			    "    <div class=\"content\">\n" +
			    "      <p>Hello "+name+",</p>\n" +
			    "      <p>We have received a request to verify your email address. Your OTP code is:</p>\n" +
			    "      <div class=\"otp\">" + otp + "</div>\n" +
			    "      <p>This OTP code is valid for "+"5 minutes. If you did not request this, please ignore this email.</p>\n" +
			    "      <p>Thank you for using our service!</p>\n" +
			    "    </div>\n" +
			    "    <div class=\"footer\">© 2024 JobZilla. All rights reserved.</div>\n" +
			    "  </div>\n" +
			    "</body>\n" +
			    "</html>";

	}
}