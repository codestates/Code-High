import * as nodemailer from 'nodemailer';

// 인증 메일
export const sendSignUpEmail = async (email: string, name: string, token: string) => {
  
  const redirectURL = `${process.env.CLIENT_ENDPOINT}/checkemail?code=${token}`
  
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      }
    })

    let info = await transporter.sendMail({
      from: `"Code High👋" <${process.env.NODEMAILER_USER}>`,
      to: `${email}`,
      subject: "[Code High] 이메일 인증을 진행해주세요.",
      text: ``,
      html: `
      <style>
  .btn-ctf {
    background-color: #2f8c4c;
    color: #ffffff;
    padding: 20px 60px;
    border-radius: 10px;
    text-decoration: none;
  }
  td {
    font-size: 16px;
    line-height: 1.4;
    font-family: Arial, sans-serif;
    padding: {
      top: 0;
      right: 0;
      bottom: 30px;
      left: 0;
    }
  }
</style>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td bgcolor="#ffffff" style="font-size: 0; line-height: 0; height: 0;" height="0">
      <table>
        <tr>
          <td border="0" cellpadding="0" cellspacing="0" width="100%">
            <img src="https://cdn.discordapp.com/attachments/879193560598061087/887501955226816552/codehigh.png" style="display: block;" alt="Some image" height="50" weight="100">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td>
            <div>
              안녕하세요 ${name}님 <br/>
              아래 버튼을 눌러 이메일 인증을 완료해주세요.<br/>
              이 링크는 5분간 유효합니다.
            </di>
            <div align="center" style="padding: 20px;">
              <a href=${redirectURL} class="btn-ctf" target="_blank">이메일 인증</a>
            </div>
            <div>
              <div>버튼이 보이지 않는다면, 위 주소로 접속해 이메일 인증을 진행해주세요.<br>
              <div>${redirectURL}</div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    })
  } catch (err) {
    console.log(err);
  }
}


export const sendPasswordEmail = async (email: string, code: string) => {
  const redirectURL = `${process.env.CLIENT_ENDPOINT}/resetpassword?code=${code}`
  
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      }
    })

    let info = await transporter.sendMail({
      from: `"Code High👋" <${process.env.NODEMAILER_USER}>`,
      to: `${email}`,
      subject: "[Code High] 비밀번호 재설정을 진행해주세요.",
      text: ``,
      html: `
      <style>
  .btn-ctf {
    background-color: #2f8c4c;
    color: #ffffff;
    padding: 20px 60px;
    border-radius: 10px;
    text-decoration: none;
  }
  td {
    font-size: 16px;
    line-height: 1.4;
    font-family: Arial, sans-serif;
    padding: {
      top: 0;
      right: 0;
      bottom: 30px;
      left: 0;
    }
  }
</style>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
    <td bgcolor="#ffffff" style="font-size: 0; line-height: 0; height: 0;" height="0">
      <table>
        <tr>
          <td border="0" cellpadding="0" cellspacing="0" width="100%">
            <img src="https://cdn.discordapp.com/attachments/879193560598061087/887501955226816552/codehigh.png" style="display: block;" alt="Some image" height="50" weight="100">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td>
            <div>
              아래 버튼을 클릭해 비밀번호 재설정을 진행해주세요.<br/>
              이 링크는 5분간 유효합니다.
            </di>
            <div align="center" style="padding: 20px;">
              <a href=${redirectURL} class="btn-ctf" target="_blank">비밀번호 재설정</a>
            </div>
            <div>
              <div>버튼이 보이지 않는다면, 위 주소로 접속해 비밀번호 변경을 진행해주세요.<br>
              <div>${redirectURL}</div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td></td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    })
  } catch (err) {
    console.log(err);
  }
}