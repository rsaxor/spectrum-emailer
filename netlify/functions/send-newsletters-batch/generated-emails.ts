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
emailTemplates.set('spec0005.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
                                        <a href="https://spectrumdubai.com?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005" target="_blank">
                                            <img src="{{host}}/newsletter/spec0005/0005-01.jpg" height="437" alt="Spectrum UAE Ltd. Office" width="496">
                                        </a>
                                    </td>
                                    <td style="padding-left: 15px; padding-right: 15px;">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="20"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="https://spectrumdubai.com?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005">
                                                        <img src="{{host}}/newsletter/spec0005/0005-02.png" alt="Spectrum UAE Ltd. Logo" width="74" height="58">
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
                                        Hello {{fullName}},
                                        <br>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td  style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.2;">
                                        <b>KICKSTART 2026 WITH ULTRA-PREMIUM BOOKS AND PACKAGING THAT COMMAND ATTENTION.</b>
                                        <br>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        This year belongs to brands that show up boldly. <br>
                                        At Spectrum Print, we transform your vision into museum-quality books, elevated packaging, and eco-intelligent print that turn heads before a single word is read.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Whether you are launching a tower, pitching investors, or refreshing your brand assets, go big, go premium, go unforgettable.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.25;">
                                        <b>WHAT WE DELIVER:</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <ul style="padding-left: 15px; margin-top: 0;">
                                            <li>Coffee-table books for real estate and luxury sectors</li>
                                            <li>High-end packaging with precision finishing</li>
                                            <li>Eco printing that meets global sustainability standards</li>
                                            <li>Brass signage and wall graphics that define spaces</li>
                                            <li>Business cards with NFC that make an entrance</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="3"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <b>Start 2026 with impact. Book your January slot.</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/contact?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005">
                                            <img src="{{host}}/newsletter/spec0005/0005-03.jpg" alt="Book Now" width="125" height="32">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="50"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="460" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left">
                                        <a href="https://spectrumdubai.com/services/printing-press?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005" target="_blank" style="text-decoration: none;">
                                            <img src="{{host}}/newsletter/spec0005/0005-04.jpg" width="215" height="164" alt="BRAND LABELS">
                                            <p style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.25; text-align: center; margin-top: 15px; margin-bottom: 0; padding: 0;">BRAND LABELS</p>
                                        </a>
                                    </td>
                                    <td align="right">
                                        <a href="https://spectrumdubai.com/services/luxury-packaging?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005" target="_blank" style="text-decoration: none;">
                                            <img src="{{host}}/newsletter/spec0005/0005-05.jpg" width="215" height="164" alt="VIP BOXES">
                                            <p style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.25; text-align: center; margin-top: 15px; margin-bottom: 0; padding: 0;">VIP BOXES</p>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" height="25"></td>
                                </tr>
                                <tr>
                                    <td align="left">
                                        <a href="https://spectrumdubai.com/services/printing-press/book-printing?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005" target="_blank" style="text-decoration: none;">
                                            <img src="{{host}}/newsletter/spec0005/0005-06.jpg" width="215" height="164" alt="BOOKS">
                                            <p style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.25; text-align: center; margin-top: 15px; margin-bottom: 0; padding: 0;">BOOKS</p>
                                        </a>
                                    </td>
                                    <td align="right">
                                        <a href="https://spectrumdubai.com/services/printing-press/menus?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005" target="_blank" style="text-decoration: none;">
                                            <img src="{{host}}/newsletter/spec0005/0005-07.jpg" width="215" height="164" alt="MENUS">
                                            <p style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.25; text-align: center; margin-top: 15px; margin-bottom: 0; padding: 0;">MENUS</p>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                    <tr bgcolor="#EFEFEF">
                        <td style="padding-left: 30px; padding-right: 30px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #000000; font-family: Times New Roman, Times, serif; font-size: 20px; line-height: 1; text-transform: uppercase; letter-spacing: 1px;">
                                        DISCOVER SUSTAINABLE GROWTH 
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/services/sustainable-printing?utm_source=newsletter&utm_medium=email&utm_campaign=the_year_we_print_bigger&utm_id=spec0005" target="_blank"  >
                                            <img src="{{host}}/newsletter/spec0005/0005-08.jpg" alt="Learn More" width="140" height="36">
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
                        <td height="22"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <table width="142" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <ul style="list-style:none; margin:0; padding:0; display:flex; justify-content:center;">
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.instagram.com/spectrum_print" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0005/0005-9.png" alt="instagram">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="http://www.facebook.com/spectrumuae" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0005/0005-10.png" alt="facebook">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="http://www.linkedin.com/company/spectrum-printing-press" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0005/0005-11.png" alt="linkedin">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.pinterest.com/spectrumuae" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0005/0005-12.png" alt="pinterest">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.youtube.com/channel/UCj20ViMQ2bknI3E6zIdoZWA" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0005/0005-13.png" alt="youtube">
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 10px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 5px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            Spectrum Sustainable Printing <br>
                                            DIFC, Gate 5, Gate Building, Level B1, Marble Walk, Dubai, UAE
                                        </p>
                                        <p style="margin-bottom: 5px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            T: <a href="tel:+97143620566" style="text-decoration: none; color: #707070;">+971 (0) 4 362 0566</a> |  <a href="mailto:info@spectrumdubai.com" style="text-decoration: none; color: #707070;">E: info@spectrumdubai.com</a>
                                        </p>
                                        <p style="margin-bottom: 3px; margin-top: 15px; text-align: center; font-size: 7px;">
                                           © 2025 Spectrum Sustainable Printing. All rights reserved
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="5"></td>
                                </tr>
                                <tr>
                                    <td style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center; line-height: 1.5;">
                                            You are receiving this message for any of the following reasons: <br>
                                            we have provided you with our services in the past or you are a valued client, <br>
                                            you opted in or interacted with us via our website
                                        </p>
                                        <p style="margin-bottom: 0; margin-top: 0; text-align: center;">
                                            Click here <a href="{{unsubscribeLink}}" style="color: #4692db;">unsubscribe</a>.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20"></td>
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
emailTemplates.set('spec0006.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        Spectrum UAE Ltd. - THIS NATION'S FUTURE BEGAN ON PAPER
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
                        <td style="padding-left: 0; padding-right: 0;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_Feb_Forbes&utm_id=spec0006">
                                            <img src="{{host}}/newsletter/spec0006/0006-01.png" alt="Spectrum UAE Ltd. Logo" width="100" height="75">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/blog/2026/01/28/this-nations-future-began-on-paper-planned-printed-preserved?utm_source=newsletter&utm_medium=email&utm_campaign=2026_Feb_Forbes&utm_id=spec0006"><img src="{{host}}/newsletter/spec0006/0006-002.jpg" alt="THIS NATION'S FUTURE BEGAN ON PAPER. PLANNED. PRINTED. PRESERVED." width="500" height="562"></a>
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
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Visionaries like <b>HH Sheikh Rashid bin Saeed Al Maktoum</b> shaped Dubai’s foundations through documents and drawings, while the first Arab journalist to arrive, <b>Salim Zabbal</b>, captured its rise in print.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Because big ideas begin with something tangible.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        Today, brands shaping what’s next still choose print when a message must be seen, kept, and remembered, from launches and invitations to menus, catalogues, presentations and packaging.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        <b>Printing isn’t the problem. How you print is.</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25;">
                                        At Spectrum Sustainable Printing, we use responsibly sourced materials and low-impact processes to create premium pieces.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.25;">
                                        <b>
                                            Spectrum Sustainable Printing <br>
                                            Premium. Responsible. <br>
                                            Where stories become history, not landfill.
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr bgcolor="#f2f2f4">
                        <td align="center">
                            <table width="450" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr valign="middle">
                                                <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25;">
                                                    SPECTRUM SUSTAINABLE PRINTING <br>
                                                    DIFC, Gate 5 Building, Level B1, Marble Walk, Dubai, UAE <br>
                                                    T: <a href="tel:+97143620566" style="color: #303030; text-decoration: none;">+971 (0) 4 362 0566</a> | E: <a style="color: #303030; text-decoration: none;" href="mailto:info@spectrumdubai.com">info@spectrumdubai.com</a>
                                                </td>
                                                <td>
                                                    <a href="https://spectrumdubai.com/contact?utm_source=newsletter&utm_medium=email&utm_campaign=2026_Feb_Forbes&utm_id=spec0006"><img src="{{host}}/newsletter/spec0006/0006-03.png" width="120" height="68" alt="Get in Touch"></a>
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
                                    <td align="center">
                                        <table width="142" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <ul style="list-style:none; margin:0; padding:0; display:flex; justify-content:center;">
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.instagram.com/spectrum_print" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0006/0006-04.png" alt="instagram">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="http://www.facebook.com/spectrumuae" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0006/0006-05.png" alt="facebook">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="http://www.linkedin.com/company/spectrum-printing-press" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0006/0006-06.png" alt="linkedin">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.pinterest.com/spectrumuae" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0006/0006-07.png" alt="pinterest">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.youtube.com/channel/UCj20ViMQ2bknI3E6zIdoZWA" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0006/0006-08.png" alt="youtube">
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
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
                                            Spectrum Sustainable Print Solution, Level B1, DIFC Gate District 4, Gate Ave, <br>
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
emailTemplates.set('spec0007.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>
        Spectrum UAE Ltd. - RAMADAN MUBARAK 2026
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
                        <td style="padding-left: 0; padding-right: 0;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007_home">
                                            <img src="{{host}}/newsletter/spec0007/0007-01.png" alt="Spectrum UAE Ltd. Logo" width="100" height="75">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://spectrumdubai.com/blog/2026/02/06/ramadan-mubarak-2026?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007_blog">
                                            <img src="{{host}}/newsletter/spec0007/0007-02.jpg" alt="" width="350" height="454">
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
                        <td style="padding-left: 100px; padding-right: 100px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <img src="{{host}}/newsletter/spec0007/0007-03.jpg" alt="RAMADAN MUBARAK, May this holy month bring peace and blessings to you and your loved ones." width="300" height="60">
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 18px; line-height: 1.25; text-transform: uppercase;">
                                        <b>RAMADAN MUBARAK</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25;">
                                        May this holy month bring peace and <br>
                                        blessings to you and your loved ones.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="380" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="12">
                                            <tr>
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://spectrumdubai.com/services/printing-press/corporate-gift-items/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007_corporate_gift" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/spec0007/0007-08.jpg" alt="" width="160" height="171">
                                                    </a>
                                                </td>
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://spectrumdubai.com/services/printing-press/custom-made-box/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007_custom_box" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/spec0007/0007-09.jpg" alt="" width="160" height="171">
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr valign="top">
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://spectrumdubai.com/services/luxury-packaging/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007_luxury_packaging" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/spec0007/0007-10.jpg" alt="" width="160" height="171">
                                                    </a>
                                                </td>
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://spectrumdubai.com/services/printing-press/tv-cards/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007_tv_card" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/spec0007/0007-11.jpg" alt="" width="160" height="171">
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
                                    <td style="text-align: center; color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25;">
                                        Looking for customised Ramadan gift packaging for your organisation? <br>
                                        Get in touch with Spectrum Print to create thoughtful, <br>
                                        well-made packaging in time for Ramadan.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="50"></td>
                    </tr>
                    <tr bgcolor="#f2f2f4">
                        <td align="center">
                            <table width="480" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="25"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr valign="middle">
                                                <td style="color: #303030; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25;">
                                                    SPECTRUM SUSTAINABLE PRINTING <br>
                                                    DIFC, Gate 5 Building, Level B1, Marble Walk, Dubai, UAE <br>
                                                    T: <a href="tel:+97143620566" style="color: #303030; text-decoration: none;">+971 (0) 4 362 0566</a> | E: <a style="color: #303030; text-decoration: none;" href="mailto:info@spectrumdubai.com">info@spectrumdubai.com</a>
                                                </td>
                                                <td>
                                                    <a href="https://spectrumdubai.com/contact?utm_source=newsletter&utm_medium=email&utm_campaign=2026_SPEC_RAMADAN&utm_id=spec0007"><img src="{{host}}/newsletter/spec0007/0007-12.png" width="120" height="68" alt="Get in Touch"></a>
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
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <table width="142" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <ul style="list-style:none; margin:0; padding:0; display:flex; justify-content:center;">
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.instagram.com/spectrum_print" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0007/0007-04.png" alt="instagram">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="http://www.facebook.com/spectrumuae" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0007/0007-05.png" alt="facebook">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="http://www.linkedin.com/company/spectrum-printing-press" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0007/0007-06.png" alt="linkedin">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.pinterest.com/spectrumuae" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0007/0007-07.png" alt="pinterest">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.youtube.com/channel/UCj20ViMQ2bknI3E6zIdoZWA" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/spec0007/0007-08.png" alt="youtube">
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
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
                                            Spectrum Sustainable Print Solution, Level B1, DIFC Gate District 4, Gate Ave, <br>
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
                                <tr align="center">
                                    <td align="center">
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
                                        <table width="142" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td>
                                                    <ul style="list-style:none; margin:0; padding:0; display:flex; justify-content:center;">
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
                                        </table>
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
emailTemplates.set('tcc0002.html', `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=0.5, target-densitydpi=device-dpi, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>THE CARD CO. - SEASON OF NEW BEGINNINGS</title>
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
                        <td height="30"></td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr align="left" valign="top">
                                    <td style="padding-left: 30px;">
                                        <a href="https://thecardco.ae?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002" target="_blank">
                                            <img src="{{host}}/newsletter/tcc0002/0002-01.jpg" height="494" alt="2026 Spring Festival" width="480">
                                        </a>
                                    </td>
                                    <td style="padding-left: 10px; padding-right: 30px;">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="20"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="https://thecardco.ae?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002">
                                                        <img src="{{host}}/newsletter/tcc0002/0002-02.jpg" alt="The Card Co. Logo" width="50" height="49">
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
                        <td height="20"></td>
                    </tr>
                    <tr>
                        <td style="padding-left: 80px; padding-right: 80px;">
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25; text-align: center; padding-left: 30px; padding-right: 30px;">
                                        Spring Festival is a time to honour tradition, welcome good fortune, and celebrate the people who matter most. This season, The Card Co invites you to mark every moment with thoughtful paper goods, refined gifting, and greetings designed to be kept forever. 
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://www.thecardco.ae/shop?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002">
                                            <img src="{{host}}/newsletter/tcc0002/0002-03.jpg" alt="Red gift card" width="320" height="290">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center; padding-left: 30px; padding-right: 30px;">
                                        Spring Festival Gifting (Made Effortless)
                                    </td>
                                </tr>
                                <tr>
                                    <td height="12"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25; text-align: center; padding-left: 30px; padding-right: 30px;">
                                        A beautiful gift begins with a presentation. Curate your Spring Festival offering with refined details, finished with one of our premium gift wraps and message cards.
                                        Inspired by the season’s focus on heartfelt gifting and elevated finishing touches. 
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellspacing="0" cellpadding="8">
                                            <tr>
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://www.thecardco.ae/collections/wedding-stationary?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/tcc0002/0002-04.jpg" alt="PLACE CARDS" width="204" height="157">
                                                        <p style="margin: 0; padding-left: 0; padding-right: 0; padding-top: 10px; padding-bottom: 0;">
                                                            PLACE CARDS
                                                        </p>
                                                    </a>
                                                </td>
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://www.thecardco.ae/valentines-collection?Category=Valentine%2520Card?&utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/tcc0002/0002-05.jpg" alt="GREETING CARDS" width="204" height="157">
                                                        <p style="margin: 0; padding-left: 0; padding-right: 0; padding-top: 10px; padding-bottom: 0;">
                                                            GREETING CARDS
                                                        </p>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr valign="top">
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://www.thecardco.ae/shop-all?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/tcc0002/0002-06.jpg" alt="CUSTOM MONEY ENVELOPE" width="204" height="157">
                                                        <p style="margin: 0; padding-left: 0; padding-right: 0; padding-top: 10px; padding-bottom: 0;">
                                                            CUSTOM MONEY <br>ENVELOPE
                                                        </p>
                                                    </a>
                                                </td>
                                                <td style="text-transform: uppercase; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center;">
                                                    <a href="https://www.thecardco.ae/valentines-collection?Category=Valentine%2520Gifts&utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002" style="color: #000000; text-decoration: none;">
                                                        <img src="{{host}}/newsletter/tcc0002/0002-07.jpg" alt="VALENTINE GIFTS" width="204" height="157">
                                                        <p style="margin: 0; padding-left: 0; padding-right: 0; padding-top: 10px; padding-bottom: 0;">
                                                            VALENTINE GIFTS
                                                        </p>
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="40"></td>
                                </tr>
                                <!-- <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.25; text-align: center; padding-left: 30px; padding-right: 30px;">
                                        A Message That Lasts (Valentine section)
                                    </td>
                                </tr>
                                <tr>
                                    <td height="12"></td>
                                </tr>
                                <tr>
                                    <td style="color: #000000; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25; text-align: center; padding-left: 30px; padding-right: 30px;">
                                        This season, send more than greetings. <br>
                                        Send love. Send luck. Send a message they’ll reread.
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>

                                <tr>
                                    <td height="20"></td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <a href="https://thecardco.ae/contact?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002">
                                            <img src="{{host}}/newsletter/tcc0002/0002-08.jpg" alt="Shop The Spring Festival Collection" width="320" height="39">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="30"></td>
                                </tr> -->
                            </table>
                        </td>
                    </tr>
                    <tr bgcolor="#951c1f">
                        <td>
                            <table width="100%" cellspacing="0" cellpadding="0">
                                <td width="300">
                                    <img src="{{host}}/newsletter/tcc0002/0002-09.jpg" alt="pens arranged in asterisk symbol" width="300" height="352">
                                </td>
                                <td width="300" align="left">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.25; text-align: left;">
                                                Available in-store & online <br>
                                                Customisation available upon request
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height="25"></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="https://www.thecardco.ae/shop?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002">
                                                    <img src="{{host}}/newsletter/tcc0002/0002-10.jpg" alt="Shop The Spring Festival Collection" width="150" height="">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="30"></td>
                    </tr>
                                        <tr>
                        <td align="center">
                            <table width="470" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <table width="142" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td>
                                                    <ul style="list-style:none; margin:0; padding:0; display:flex; justify-content:center;">
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.instagram.com/thecardco/" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/tcc0002/0002-11.png" alt="instagram">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.facebook.com/TheCardCo/" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/tcc0002/0002-12.png" alt="facebook">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.linkedin.com/company/the-card-co-/" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/tcc0002/0002-13.png" alt="linkedin">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.pinterest.com/thecardco/" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/tcc0002/0002-14.png" alt="pinterest">
                                                            </a>
                                                        </li>
                                                        <li style="margin:0 5px; display:inline-block;">
                                                            <a href="https://www.youtube.com/@thecardco.8743" target="_blank">
                                                                <img width="18" height="18" src="{{host}}/newsletter/tcc0002/0002-15.png" alt="youtube">
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="15"></td>
                                </tr>
                                <tr>
                                    <td
                                        style="color: #707070; font-family: Arial,Helvetica, sans-serif; font-size: 7px; text-align: justify; line-height: 1.25;">
                                        <p style="margin-bottom: 8px; margin-top: 0; text-align: center;">
                                            Copyright (C) 2025 <a href="https://thecardco.ae/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_spring_festival&utm_id=tcc0002" target="_blank" style="color: #707070; text-decoration: none;;">The Card Co.</a> All rights reserved.
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
