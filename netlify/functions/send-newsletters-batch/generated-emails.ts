export const emailTemplates = new Map<string, string>();

emailTemplates.set('goodbye-unsubscribe.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>Unsubscribed succesfully</title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#dfdfdf">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="450" cellspacing="0" cellpadding="0">
                                <tr align="center">
                                    <td style="padding-left: 7px; padding-right: 7px;"><img src="https://emailer.spectrumdubai.com/{{entityImg}}" alt="{{entity}}" width="100"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-left: 30px; padding-right: 30px; color: #303030; font-family: Arial,Helvetica, sans-serif; font-size: 16px; text-align: justify; line-height: 1.25;">
                            <p style="font-size: 18px; text-align: center; margin: 0 0 18px 0;">
                                You have successfully unsubscribed to {{entity}}'s newsletter.
                            </p>
                            <p style="font-size: 16px; text-align: center; margin: 0 0 18px 0;">
                                If you change your mind, you can always <a href="{{resubscribe}}">re-subscribe</a>.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr bgcolor="#dedede">
                        <td height="1"></td>
                    </tr>
                    <tr>
                        <td height="18"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 0px; margin-top: 0; text-align: center;">
                                            Click here <a href="{{resubscribe}}">subscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('spec0001.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        
    </title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */ 
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fbfbfb">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
                    <tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr align="left" valign="top">
                                    <td>
                                        <img src="{{host}}/newsletter/spec0001/0001-01.jpg" height="387" alt="Welcome to the World of Spectrum" width="496">
                                    </td>
                                    <td style="padding-left: 15px; padding-right: 15px;">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="20"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="https://spectrumdubai.com/"><img src="{{host}}/newsletter/spec0001/0001-02.png" alt="Spectrum UAE Ltd. Logo" width="74" height="58"></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="10"></td>
                    </tr>
                    <tr align="center">
                        <td style="color: #000000; font-family: Helvetica, Arial, sans-serif; font-size: 7px; line-height: 1;">
                            <p style="margin: 0; text-transform: uppercase; text-align: center; letter-spacing: 1px;">As part of our iniative, we’re updating our client database to better serve you.</p>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td style="padding-left: 100px; padding-right: 100px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        At Spectrum Sustainable Printing, we believe every page can carry more than words — it can carry values. By joining, you’re now part of a community dedicated to printing with purpose and shaping a sustainable tomorrow.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Here’s what you can expect:
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr valign="top">
                                                <td width="25">
                                                    <img width="25" height="25" src="{{host}}/newsletter/spec0001/icon-01.png" alt="">
                                                </td>
                                                <td style="padding-left: 10px; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                                    Inspiration & Insights — Learn how small choices in print can make a big environmental impact.
                                    			</td>
                                			</tr>
                                			<tr>
                                                <td colspan="2" height="15"></td>
                                			</tr>
                                            <tr valign="top">
                                                <td width="25">
                                                    <img width="25" height="25" src="{{host}}/newsletter/spec0001/icon-02.png" alt="">
                                                </td>
                                                <td style="padding-left: 10px; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                                    Practical Tips — From reducing paper waste to choosing vegan inks and eco-certified paper.
                                    			</td>
                                			</tr>
                                			<tr>
                                                <td colspan="2" height="15"></td>
                                            </tr>
                                            <tr valign="top">
                                                <td width="25">
                                                    <img width="25" height="25" src="{{host}}/newsletter/spec0001/icon-03.png" alt="">
                                                </td>
                                                <td style="padding-left: 10px; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                                    Innovation Highlights — Discover the latest in green printing and design that redefines luxury.
                                                </td>
											</tr>
											<tr>
                                                <td colspan="2" height="15"></td>
                                            </tr>
                                            <tr valign="top">
                                                <td width="25">
                                                    <img width="25" height="25" src="{{host}}/newsletter/spec0001/icon-04.png" alt="">
                                                </td>
                                                <td style="padding-left: 10px; color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                                    Community Connection — Be part of a network that believes responsibility is the new prestige.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        This isn’t just a newsletter — it’s your invitation to a movement. Together, we’re writing a story where sustainability is not a trend, but a timeless legacy.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="40"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr bgcolor="#EFEFEF">
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #000000; font-family: Times New Roman, Times, serif; font-size: 20px; line-height: 1; text-transform: uppercase; letter-spacing: 1px;">
                                        BE PART OF SUSTAINABILITY 
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="{{resubscribe}}">
                                            <img src="{{host}}/newsletter/spec0001/0001-03.png" alt="Subscribe here" width="140" height="31">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25"></td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td height="18"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}" style="color: #4692db;">unsubscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('spec0002.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        
    </title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */ 
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fbfbfb">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="background-color:#ffffff;">
                    <tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr align="left" valign="top">
                                    <td>
                                        <img src="{{host}}/newsletter/spec0002/0002-01.jpg" alt="Welcome to the World of Spectrum" width="100%">
                                    </td>
                                    <td style="padding-left: 18px; padding-right: 18px;">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="20"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="https://spectrumdubai.com/"><img src="{{host}}/newsletter/spec0002/0002-02.png" alt="Spectrum UAE Ltd. Logo" width="74"></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td style="padding-left: 112px; padding-right: 112px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1;">
                                        Dear {{fullName}},
                                        <br>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1;">
                                        Welcome to our movement. 🌱
                                        <br>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Thank you for joining Spectrum Sustainable Printing on a journey that is bigger than ink and paper. By signing up, you’ve chosen to be part of a story where design meets responsibility, where beauty serves the planet, and where every print is a step toward a cleaner tomorrow.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <ul style="padding-left: 10px; margin: 0;">
                                            <li style="padding-bottom: 5px;">
                                                You’ve joined a community that believes luxury and sustainability can walk hand in hand.
                                            </li>
                                            <li style="padding-bottom: 5px;">
                                                You’ve chosen to stand with us for conscious printing, using FSC-certified papers, vegan inks, and eco-friendly processes.
                                            </li>
                                            <li style="padding-bottom: 5px;">
                                                Most importantly, you’ve chosen impact over noise.
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Welcome aboard, we’re grateful you’re here.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        With respect and gratitude,
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        The Spectrum Sustainable Printing Team <br>
                                        Leaders in Sustainability Printing Since 2006
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr bgcolor="#EFEFEF">
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #000000; font-family: Times New Roman, Times, serif; font-size: 23px; line-height: 1; text-transform: uppercase; letter-spacing: 1px;">
                                        <p style="text-align: center; margin: 0; padding: 0;">Stay tuned</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.5; ">
                                        <p style="text-align: center; margin: 0; padding: 0;">
                                            For inspiration, stories, and ideas that will not <br>
                                            only spark creativity, but also reflect your values. <br>
                                            Together, we’ll print less waste and more meaning.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com">
                                            <img src="{{host}}/newsletter/spec0002/0002-03.png" alt="Subscribe here" width="140">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20"></td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td height="18"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}" style="color: #4692db;">unsubscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('spec0003.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        
    </title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */ 
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fbfbfb">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
                    <tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr align="left" valign="top">
                                    <td>
                                        <a href="https://spectrumdubai.com/pdf/Spectrum-pitching-brochure.pdf" target="_blank">
                                            <img src="{{host}}/newsletter/spec0003/0003-01.jpg" height="386" alt="Spectrum's The Art of Pitching" width="496">
                                        </a>
                                    </td>
                                    <td style="padding-left: 15px; padding-right: 15px;">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="20"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="https://spectrumdubai.com/">
                                                        <img src="{{host}}/newsletter/spec0003/0003-02.png" alt="Spectrum UAE Ltd. Logo" width="74" height="58">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td style="padding-left: 100px; padding-right: 100px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1;">
                                        Hello, {{fullName}}!
                                        <br>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <b>Did you know that opportunities are often won or lost in the first few minutes</b>. <br>
                                        A printed presentation can win commitment.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        We create materials that decision-makers engage with, keep, and return to. When your strategy is in their hands, it carries more weight and credibility than on any screen.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <b>Why choose Spectrum Sustainability Printing for your pitch? </b><br>It is the smart choice for smarter business. Spectrum combines quality with responsibility.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <b>Clients trust us to:</b>
                                        <ul style="padding-left: 15px; margin-top: 5px;">
                                            <li>Deliver polished materials that impress stakeholders</li>
                                            <li>Eliminate the waste of low-quality reprints</li>
                                            <li>Align with sustainable practices that strengthen brand credibility.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="3"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <a href="https://spectrumdubai.com/pdf/Spectrum-pitching-brochure.pdf" target="_blank" style="text-decoration: underline; color: #000000;"><b>Read more about the Art of Pitching</b></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr bgcolor="#EFEFEF">
                        <td style="padding-left: 30px; padding-right: 30px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #000000; font-family: Times New Roman, Times, serif; font-size: 20px; line-height: 1; text-transform: uppercase; letter-spacing: 1px;">
                                        WORK WITH US 
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Great ideas deserve more than standard printing. <br>At Spectrum, we help businesses create materials that build trust, <br>strengthen reputation, and support results.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/contact">
                                            <img src="{{host}}/newsletter/spec0003/0003-03.jpg" alt="Contact Us" width="110" height="29">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25"></td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td height="18"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}" style="color: #4692db;">unsubscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('spec0004.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        
    </title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */ 
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fbfbfb">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
                    <tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr align="left" valign="top">
                                    <td style="padding-left: 15px; padding-right: 15px;">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="20"></td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    <a href="https://spectrumdubai.com/">
                                                        <img src="{{host}}/newsletter/spec0004/0004-02.png" alt="Spectrum UAE Ltd. Logo" width="74" height="58">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="30"></td>
                                            </tr>
                                            <tr>
                                                <td align="center">
                                                    <a href="https://www.instagram.com/p/DRUDGi2D-mv/?igsh=MW1nMWhnc2ZwbjZ5aA==" target="_blank">
                                                        <img src="{{host}}/newsletter/spec0004/0004-01.jpg" width="450" height="301" alt="Printing isn't the problem. Irresponsible printing is.">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td style="padding-left: 100px; padding-right: 100px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.25;">
                                        <b>Every brand wants to look sustainable. <br>But what you print says who you are.</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        A laminated bag, a plastic-coated box, a foil that never decomposes every choice tells a story.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <b>At Spectrum Sustainable Print Solutions</b>, we make print part of the solution through eco-friendly inks, recycled papers, and <br>
                                        plastic-free finishes. Sustainability isn't a trend; it's a responsibility. We believe in printing consciously and leaving an impact that honors the planet.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Join us. Print with purpose. Leave a lasting impression, not a lasting footprint.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="https://spectrumdubai.com/services/sustainable-printing/" target="_blank"><img src="{{host}}/newsletter/spec0004/0004-03.jpg" width="400" height="142" alt="Vegan Ink, Acid Free, FSC, Recyclable, Chlorine Free, 100% Recycled Fibers"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="60"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr bgcolor="#f2f2f4">
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr valign="middle">
                                                <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.25;">
                                                    SPECTRUM SUSTAINABLE PRINTING <br>
                                                    DIFC, Gate 5 Building, Level B1, Marble Walk, Dubai, UAE <br>
                                                    T: <a href="tel:+97143620566" style="color: #303030; text-decoration: none;">+971 (0) 4 362 0566</a> | E: <a style="color: #303030; text-decoration: none;" href="mailto:info@spectrumdubai.com">info@spectrumdubai.com</a>
                                                </td>
                                                <td>
                                                    <a href="https://linktr.ee/spectrumuae"><img src="{{host}}/newsletter/spec0004/0004-04.png" width="120" height="68" alt="Get in Touch"></a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25"></td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <tr>
                        <td height="18"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}" style="color: #4692db;">unsubscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('tcc0001.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        
    </title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */ 
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#fbfbfb">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
                    <tr>
                        <td>
                            <img src="{{host}}/newsletter/tcc0001/0001-01.jpg" width="600" height="429" alt="Warm Greetings from The Card Co.">
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="520" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial,Helvetica, sans-serif; font-size: 13px; text-align: justify; line-height: 1.25;">
                                        <p style="margin: 0; padding: 0; text-align: center;">
                                            <b>Festive & Fresh: Your Holiday Gifting and 2026 Planning Starts Here!</b>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.3; padding-left: 40px; padding-right: 40px">
                                        <p style="margin: 0; padding: 0; text-align: center;">
                                            Step into The Card Co's festive collection, curated pieces for him and her, from personalised Christmas cards to monogrammed journals and 2026 day planners. Discover Limited Edition treasures, greeting cards and elegant pens designed to complete your holiday gifting in one thoughtful sweep.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <tr>
                                    <td style="color: #B70000; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.3; padding-left: 40px; padding-right: 40px">
                                        <p style="margin: 0; padding: 0; text-align: center;">
                                            <b>Plan Ahead: January 2026 Bookings Now Open</b>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.3; padding-left: 40px; padding-right: 40px">
                                        <p style="margin: 0; padding: 0; text-align: center;">
                                            Ready to kickstart the New Year? <br>
                                            We are now accepting bookings for January 2026 consultations. <br>
                                            Secure your spot today to discuss your next custom project!
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a target="_blank" href="https://thecardco.setmore.com/">
                                            <img src="{{host}}/newsletter/tcc0001/0001-02.jpg" width="150" height="26" alt="Book Now">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="https://www.thecardco.ae/shop/" target="_blank"><img src="{{host}}/newsletter/tcc0001/0001-03.jpg" width="520" height="152" alt="The exlusive holiday collection"></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.3; padding-left: 110px; padding-right: 110px">
                                        <p style="margin: 0; padding: 0; text-align: center;">Get ready for the most wonderful time of the year with The Card Co's exclusive Christmas Gift Collections!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <table width="460" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left">
                                                    <a href="https://www.thecardco.ae/product-page/travel-gift-set" target="_blank">
                                                        <img src="{{host}}/newsletter/tcc0001/0001-04.jpg" width="215" height="213" alt="Travel Gift Set">
                                                    </a>
                                                </td>
                                                <td align="right">
                                                    <a href="https://www.thecardco.ae/product-page/crafter-vegan-leather-notebook-lined" target="_blank">
                                                        <img src="{{host}}/newsletter/tcc0001/0001-05.jpg" width="215" height="213" alt="Crafted Vegan Leather Notebook">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" height="30"></td>
                                            </tr>
                                            <tr>
                                                <td align="left">
                                                    <a href="https://www.thecardco.ae/product-page/weekly-planner" target="_blank">
                                                        <img src="{{host}}/newsletter/tcc0001/0001-06.jpg" width="215" height="213" alt="Weekly Planner">
                                                    </a>
                                                </td>
                                                <td align="right">
                                                    <a href="https://www.thecardco.ae/product-page/fountain-wood-themed" target="_blank">
                                                        <img src="{{host}}/newsletter/tcc0001/0001-07.jpg" width="215" height="213" alt="Fountain Pen - Wood Themed">
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://www.thecardco.ae/shop">
                                            <img src="{{host}}/newsletter/tcc0001/0001-08.jpg" width="150" height="26" alt="Shop Now">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="40"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr bgcolor="#000000">
                                    <td height="1"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <ul width="142" style="list-style:none; margin:0; padding:0; display:flex; justify-content:center;">
                                            <li style="margin:0 5px; display:inline-block;">
                                                <a href="https://www.instagram.com/thecardco/" target="_blank">
                                                    <img width="18" height="18" src="{{host}}/newsletter/tcc0001/00001-9.png" alt="instagram">
                                                </a>
                                            </li>
                                            <li style="margin:0 5px; display:inline-block;">
                                                <a href="https://www.facebook.com/TheCardCo/" target="_blank">
                                                    <img width="18" height="18" src="{{host}}/newsletter/tcc0001/00001-10.png" alt="facebook">
                                                </a>
                                            </li>
                                            <li style="margin:0 5px; display:inline-block;">
                                                <a href="https://www.linkedin.com/company/the-card-co-/" target="_blank">
                                                    <img width="18" height="18" src="{{host}}/newsletter/tcc0001/00001-11.png" alt="linkedin">
                                                </a>
                                            </li>
                                            <li style="margin:0 5px; display:inline-block;">
                                                <a href="https://www.pinterest.com/thecardco/" target="_blank">
                                                    <img width="18" height="18" src="{{host}}/newsletter/tcc0001/00001-12.png" alt="pinterest">
                                                </a>
                                            </li>
                                            <li style="margin:0 5px; display:inline-block;">
                                                <a href="https://www.youtube.com/@thecardco.8743" target="_blank">
                                                    <img width="18" height="18" src="{{host}}/newsletter/tcc0001/00001-13.png" alt="youtube">
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 <a href="https://thecardco.ae/" target="_blank" style="color: #707070; text-decoration: none;;">The Card Co.</a> All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            The Card Co, DIFC, Level B1, The Gate Building Gate Avenue, Dubai - UAE
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}" style="color: #4692db;">unsubscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('test-spectrum-2025-09-16.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>SPECTRUM NEWSLETTER - SEPTEMBER 2025</title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#dfdfdf">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF">
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="450" cellspacing="0" cellpadding="0">
                                <tr align="center">
                                    <td style="padding-left: 7px; padding-right: 7px;"><img src="https://emailer.spectrumdubai.com/tcc.png" alt="The card co." width="100"></td>
                                    <td style="padding-left: 7px; padding-right: 7px;"><img src="https://emailer.spectrumdubai.com/spectrum.png" alt="Spectrum Sustainable Print" width="100"></td>
                                    <td style="padding-left: 7px; padding-right: 7px;"><img src="https://emailer.spectrumdubai.com/hos.png" alt="House of Spectrum" width="100"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15"></td>
                    </tr>
                    <tr>
                        <td align="center" style="color: #000000; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.25;"">
                            <p style="font-size: 24px; text-align: center; margin: 0;">
                                <b>Welcome, {{fullName}}!</b>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height="10"></td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-left: 30px; padding-right: 30px; color: #303030; font-family: Arial,Helvetica, sans-serif; font-size: 16px; text-align: justify; line-height: 1.5;">
                            <p style="font-size: 18px; text-align: center; margin: 0 0 18px 0;">
                                This is a test message. Hello to you.
                            </p>
                            <p style="font-size: 14px; text-align: center; margin: 0;">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore fuga optio aliquam explicabo ullam quibusdam voluptatem placeat aliquid quam, necessitatibus minima labore asperiores nesciunt ea eius velit vel iusto voluptatibus?
                                <br>
                                <br>
                                Officia voluptatibus porro inventore veritatis vitae, tempora autem deserunt, odio amet asperiores consequatur recusandae quos unde, aspernatur maxime voluptates quas. Possimus, animi?
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr bgcolor="#dedede">
                        <td height="1"></td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            You are receiving this email because you opted in or interacted via our website.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Our mailing address is: <br>
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}">unsubscribe</a>.
                                        </p>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
emailTemplates.set('welcome-subscribers.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>Susbscription Successful! Welcome message</title>
    <style type="text/css">
        body {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }

        table {
            border-spacing: 0;
        }

        table td {
            border-collapse: collapse;
        }

        .yshortcuts a {
            border-bottom: none !important;
        }

        .hline {
            width: 100%;
        }


        /* Constrain email width for small screens */
        @media screen and (max-width: 660px) {
            table[class="container"] {
                width: 95% !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Give content more room on mobile */
        @media screen and (max-width: 480px) {
            td[class="container-padding"] {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }

            img[class="hline"] {
                width: 100%;
            }
        }

        /* Styles for forcing columns to rows */
        @media only screen and (max-width : 660px) {

            /* force container columns to (horizontal) blocks */
            td[class="force-col"] {
                width: 100% !important;
                display: block;
                padding-right: 0 !important;
            }

            table[class="col-1"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[class="col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 95% !important;
            }

            /* remove bottom border for last column/row */
            table[class="row2col-2"] {
                /* unset table align="left/right" */
                float: none !important;
                width: 100% !important;
            }

            table[id="last-col-2"] {
                float: none !important;
                border-bottom: none !important;
                margin-bottom: 0;
            }

            /* align images right and shrink them a bit */
            img[class="col-2-img"] {
                float: right;
                margin-left: 6px;
                max-width: 130px;
            }

            img[class="main-img"] {
                width: 100%;
            }

            img[class="hline"] {
                width: 100%;
            }

            img[class="col-main-img"] {
                width: 100%;
            }
        }

        sup {
            line-height: 1;
            font-size: 70%;
            vertical-align: top;
            mso-text-raise: 60%;
        }

        u+.body .glist {
            margin-left: 0 !important;
        }

        @media only screen and (max-width: 640px) {
            u+.body .glist {
                margin-left: 25px !important;
            }
        }
    </style>
</head>

<body style="margin:0;" topmargin="0" marginwidth="0" marginheight="0" leftmargin="0">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#dfdfdf">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="background-color:#ffffff;">
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="450" cellspacing="0" cellpadding="0">
                                <tr align="center">
                                    <!-- <td style="padding-left: 7px; padding-right: 7px;"><img src="https://emailer.spectrumdubai.com/{{entityImg}}" alt="{{entity}}" width="100"></td> -->
                                    <td style="padding-left: 7px; padding-right: 7px;"><img src="https://emailer.spectrumdubai.com/Spectrum.png" alt="{{entity}}" width="100"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="15"></td>
                    </tr>
                    <tr>
                        <td align="center" style="color: #000000; font-family: Arial,Helvetica, sans-serif; font-size: 12px; text-align: justify; line-height: 1.25;">
                            <p style="font-size: 20px; text-align: center; margin: 0;">
                                <b>Welcome, {{fullName}}!</b>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height="10"></td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-left: 30px; padding-right: 30px; color: #303030; font-family: Arial,Helvetica, sans-serif; font-size: 16px; text-align: justify; line-height: 1.25;">
                            <p style="font-size: 16px; text-align: center; margin: 0 0 18px 0;">
                                Thank you for subscribing to {{entity}}'s newsletter.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td height="20"></td>
                    </tr>
                    <tr bgcolor="#dedede">
                        <td height="1"></td>
                    </tr>
                    <tr>
                        <td height="18"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 Spectrum Sustainable Print Solution. All rights reserved.
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 0; text-align: center;">
                                            Our mailing address is:
                                        </p>
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Print Solution, Level B1, Difc Gate District 4, Gate Ave, <br>
                                            Dubai United Arab Emirates
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}">unsubscribe</a>.
                                        </p>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="18"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`);
