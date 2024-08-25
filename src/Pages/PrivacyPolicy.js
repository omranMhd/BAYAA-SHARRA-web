import React from "react";
import MainAppBar from "../Components/MainAppBar";
import Footer from "../Components/Footer";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <MainAppBar />

      {i18n.language === "en" ? (
        <Box
          sx={{
            width: "90%",
            marginX: "auto",
            // border: "1px solid black",
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                : null,
            backgroundColor: theme.palette.WHITE_or_BLACK,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.LIGHT_BLUE,
            }}
          >
            Privacy Policy and Confidentiality of Information for the Bayaa
            Shara App :
          </Typography>
          <Typography>
            We at Bayaa Shara App are fully aware of your concerns and interest
            regarding the privacy of your personal data on the Internet. This
            policy has been prepared to help you understand how we collect, use,
            and protect the personal data you provide to us when using our
            application.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Collection of Information :
          </Typography>
          <Typography>
            The Bayaa Shara App is designed so that you can use it without the
            need to provide personal data, unless you provide this data
            voluntarily. We will not collect any personal information without
            your explicit consent.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Internet Protocol (IP) Address :
          </Typography>
          <Typography>
            When you use the Bayaa Shara App, the host server records your
            Internet Protocol (IP) address, in addition to the date and time of
            the visit, browser type, and the URL of any site that refers you to
            our application.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Use of Data :
          </Typography>
          <Typography>
            Data collected through browsing We may use the aggregated data to
            analyze trends, administer the application, and track user movement,
            with the aim of improving the user experience.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Privacy Protection :
          </Typography>
          <Typography>
            We will at all times maintain the confidentiality of the personal
            data we obtain from you. We will not disclose this data unless
            required by law or if we believe in good faith that such action is
            necessary to comply with the law or to protect our rights.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Data required to carry out transactions :
          </Typography>
          <Typography>
            When your data is needed to carry out your requests, we will ask you
            to provide it voluntarily. This data will be used only to
            communicate with you and carry out your requests. We will not sell,
            rent or exchange your data with any third party for marketing
            purposes without your express and written consent.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Security :
          </Typography>
          <Typography>
            We take all necessary measures to protect your personal data from
            unauthorized access, modification or disclosure. We use standard
            security technologies to ensure data protection.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Modifications to the Privacy Policy :
          </Typography>
          <Typography>
            We reserve the right to modify the terms of the Privacy Policy from
            time to time in line with legal or technical requirements. You will
            be notified of any modifications to the Privacy Policy via the
            application or by email if available to us.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Contact Us :
          </Typography>
          <Typography>
            We welcome all your inquiries and comments regarding the Privacy
            Policy. You can contact us via the "Contact Us" link available in
            the application or via email
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              // color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            Conclusion :
          </Typography>
          <Typography>
            We at Bayaa Shara pay great attention to the privacy and
            confidentiality of your data. We strive to ensure the protection of
            your data and provide you with a safe and comfortable experience
            when using our application. We always look forward to improving our
            services and ensuring your satisfaction, and we hope that this
            policy will help you understand how we handle your personal data.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "90%",
            marginX: "auto",
            // border: "1px solid black",
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                : null,
            backgroundColor: theme.palette.WHITE_or_BLACK,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.LIGHT_BLUE,
            }}
          >
            سياسة الخصوصية وسرية المعلومات لتطبيق بياع شرا :
          </Typography>
          <Typography>
            نحن في تطبيق بياع شرا ندرك تماماً مخاوفكم واهتمامكم بشأن خصوصية
            بياناتكم الشخصية على شبكة الإنترنت. تم إعداد هذه السياسة لمساعدتكم
            على فهم كيفية تجميع، استخدام، وحماية البيانات الشخصية التي تقدمونها
            لنا عند استخدام تطبيقنا.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            جمع المعلومات :
          </Typography>
          <Typography>
            تم تصميم تطبيق بياع شرا بحيث يمكنكم استخدامه دون الحاجة إلى تقديم
            بيانات شخصية، إلا إذا قدمتم هذه البيانات بمحض إرادتكم. لن نقوم بجمع
            أي معلومات شخصية دون موافقتكم الصريحة.{" "}
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            عنوان بروتوكول الإنترنت (IP) :
          </Typography>
          <Typography>
            عند استخدامكم لتطبيق بياع شرا، يقوم السيرفر المضيف بتسجيل عنوان
            بروتوكول الإنترنت (IP) الخاص بكم، بالإضافة إلى تاريخ ووقت الزيارة،
            نوع المتصفح، وعنوان URL الخاص بأي موقع يحيلكم إلى تطبيقنا.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            استخدام البيانات :
          </Typography>
          <Typography>
            البيانات التي يتم جمعها من خلال التصفح قد نستخدم البيانات المجمعة
            لتحليل الاتجاهات وإدارة التطبيق وتتبع حركة المستخدمين، وذلك بهدف
            تحسين تجربة الاستخدام.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            الحفاظ على الخصوصية :
          </Typography>
          <Typography>
            سنحافظ في جميع الأوقات على سرية البيانات الشخصية التي نحصل عليها
            منكم. ولن نفصح عن هذه البيانات إلا إذا كان ذلك مطلوبًا بموجب القانون
            أو إذا كنا نعتقد بحسن نية أن هذا الإجراء ضروري للامتثال للقانون أو
            لحماية حقوقنا.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            البيانات اللازمة لتنفيذ المعاملات :
          </Typography>
          <Typography>
            عند الحاجة إلى بياناتكم لتنفيذ طلباتكم، سنطلب منكم تقديمها طوعاً.
            ستستخدم هذه البيانات فقط للتواصل معكم وتنفيذ طلباتكم. لن نقوم ببيع
            أو تأجير أو تبادل بياناتكم مع أي طرف ثالث بغرض التسويق دون موافقتكم
            الصريحة والمكتوبة.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            الأمان :
          </Typography>
          <Typography>
            نحن نتخذ كافة التدابير اللازمة لحماية بياناتكم الشخصية من الوصول غير
            المصرح به أو التعديل أو الإفشاء. نستخدم تقنيات الأمان القياسية لضمان
            حماية البيانات.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            التعديلات على سياسة الخصوصية :
          </Typography>
          <Typography>
            نحتفظ بالحق في تعديل بنود سياسة الخصوصية من وقت لآخر بما يتماشى مع
            المتطلبات القانونية أو التقنية. سيتم إشعاركم بأي تعديلات تطرأ على
            سياسة الخصوصية عبر التطبيق أو من خلال البريد الإلكتروني إذا كان
            متوفراً لدينا.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            الاتصال بنا :
          </Typography>
          <Typography>
            نرحب بجميع استفساراتكم وملاحظاتكم بشأن سياسة الخصوصية. يمكنكم
            الاتصال بنا عبر رابط "اتصل بنا" المتوفر في التطبيق أو عبر البريد
            الإلكتروني
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              // color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
              color: theme.palette.LIGHT_BLUE,
            }}
            variant="h6"
          >
            الخاتمة :
          </Typography>
          <Typography>
            نحن في بياع شرا نولي اهتماماً كبيراً بخصوصية وسرية بياناتكم , نسعى
            جاهدين لضمان حماية بياناتكم وتوفير تجربة آمنة ومريحة لكم عند استخدام
            تطبيقنا , نتطلع دائماً إلى تحسين خدماتنا وضمان رضاكم، ونأمل أن
            تساعدكم هذه السياسة في فهم كيفية تعاملنا مع بياناتكم الشخصية .
          </Typography>
        </Box>
      )}

      <Footer />
    </>
  );
}

export default PrivacyPolicy;
