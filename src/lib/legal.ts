// 法务文案独立成模块，不塞进 translations.ts —— 篇幅长、改动频率与产品文案不同，
// 且与姊妹站 VeraBowl 的 app/legal/content.ts 保持同一组织方式。
//
// 内容只描述本站**实际发生**的数据处理：两个 Netlify 表单 + GA4 + 邮件往来。
// 新增任何采集行为时必须同步更新此文件与 `updated` 日期。

export const PRIVACY_UPDATED_EN = 'Last updated: 15 August 2026';
export const PRIVACY_UPDATED_ZH = '最后更新:2026 年 8 月 15 日';

const PRIVACY_EMAIL = 'hello@petpawpot.com';

export interface LegalSection {
  h: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const privacy: { en: LegalDoc; zh: LegalDoc } = {
  en: {
    title: 'Privacy Policy',
    updated: PRIVACY_UPDATED_EN,
    intro:
      'This policy explains what PetPawPot collects through this website, why, and what choices you have. PetPawPot is a business-facing brand site: we collect very little, and we never sell your personal data.',
    sections: [
      {
        h: 'What we collect',
        body: [
          'Newsletter sign-ups: your email address, when you submit it yourself. We use it to send product and partnership updates, and you can unsubscribe from any message.',
          'Partnership enquiries: the company name, contact name, email address, country, partnership type, and message you type into our enquiry form. We use these solely to answer your enquiry and to assess a possible business relationship.',
          'Analytics: we use Google Analytics 4 to measure traffic — which pages are visited, roughly which country and referring site the visit came from, and what type of device was used. It sets cookies in your browser so repeat visits can be told apart. Your IP address is anonymised by Google.',
          'Email correspondence: if you write to us directly, we keep the message so we can reply and maintain a record of the conversation.',
        ],
      },
      {
        h: 'What we do not collect',
        body: [
          'We do not ask for payment card details on this website, and we do not run advertising or sell your data to advertisers or data brokers.',
          'We do not build behavioural advertising profiles, and we do not combine analytics data with the details you submit in a form.',
        ],
      },
      {
        h: 'Service providers we use',
        body: [
          'Netlify (United States) hosts this website and processes the two forms above.',
          'Google (Google Analytics 4) processes anonymised traffic measurement on our behalf.',
          'Google Workspace handles our business email.',
          'Each processes data on our behalf under its own security and privacy terms.',
        ],
      },
      {
        h: 'The AI Nutritionist is a separate service',
        body: [
          'Links on this site to our AI Nutritionist lead to verabowl.com, which is operated as its own product with its own privacy policy. Anything you enter there — pet profiles, recipes, accounts — is governed by that policy, not this one.',
        ],
      },
      {
        h: 'How long we keep it',
        body: [
          'Enquiries and correspondence: kept while the business relationship is live and for a reasonable period afterwards for our records.',
          'Newsletter subscriptions: kept until you unsubscribe.',
          'Google Analytics: retained according to the retention period configured in the Google Analytics property.',
        ],
      },
      {
        h: 'Your choices and rights',
        body: [
          'You can opt out of Google Analytics with Google’s browser add-on at tools.google.com/dlpage/gaoptout, or by blocking cookies for this site in your browser. The site works normally either way.',
          'You can unsubscribe from emails using the link in any message.',
          'Depending on where you live (for example EU/UK GDPR or California CCPA), you may have the right to access, correct, or delete the personal data we hold, and to object to certain processing. To make a request, email ' +
            PRIVACY_EMAIL +
            '.',
        ],
      },
      {
        h: 'International transfers',
        body: [
          'Our hosting, analytics, and email providers are based in the United States, so data submitted through this site may be processed there.',
        ],
      },
      {
        h: 'Children and changes',
        body: [
          'This site is intended for adults and for business contacts; it is not directed to children under 13.',
          'We may update this policy as the business grows. Material changes will be reflected in the “last updated” date above.',
        ],
      },
      {
        h: 'Contact',
        body: ['Questions about this policy: ' + PRIVACY_EMAIL + '.'],
      },
    ],
  },
  zh: {
    title: '隐私政策',
    updated: PRIVACY_UPDATED_ZH,
    intro:
      '本政策说明宠鲜鲜(PetPawPot)通过本网站收集什么、为什么收集,以及你有哪些选择。本站是面向企业客户的品牌站,我们收集得很少,且绝不出售你的个人数据。',
    sections: [
      {
        h: '我们收集什么',
        body: [
          '订阅邮件:你主动提交的邮箱地址。用于发送产品与合作动态,你可通过任意邮件退订。',
          '合作询盘:你在询盘表单中填写的公司名称、联系人、邮箱、国家/地区、合作类型与留言。仅用于回复你的询盘并评估潜在业务合作。',
          '访问统计:我们使用 Google Analytics 4 统计流量——哪些页面被访问、访问大致来自哪个国家和来源站点、使用了什么类型的设备。它会在你的浏览器中写入 cookie,以便区分重复访问。你的 IP 地址由 Google 匿名化处理。',
          '邮件往来:如果你直接写信给我们,我们会保留邮件以便回复并留存沟通记录。',
        ],
      },
      {
        h: '我们不收集什么',
        body: [
          '本网站不索取支付卡信息,不投放广告,也不向广告商或数据经纪商出售你的数据。',
          '我们不构建行为广告画像,也不会把统计数据与你在表单中提交的信息进行关联。',
        ],
      },
      {
        h: '我们使用的服务商',
        body: [
          'Netlify(美国):托管本网站并处理上述两个表单。',
          'Google(Google Analytics 4):代我们进行匿名化的流量统计。',
          'Google Workspace:承载我们的企业邮箱。',
          '以上各方均按其自身的安全与隐私条款代我们处理数据。',
        ],
      },
      {
        h: 'AI 营养师是独立服务',
        body: [
          '本站指向 AI 营养师的链接会跳转到 verabowl.com。该产品独立运营,有自己的隐私政策。你在那里录入的任何内容——宠物档案、配方、账户——适用该政策,而非本政策。',
        ],
      },
      {
        h: '我们保存多久',
        body: [
          '询盘与邮件往来:在业务关系存续期间保存,并在其后合理期限内留档。',
          '邮件订阅:保存至你退订为止。',
          'Google Analytics:按该媒体资源中配置的数据保留期限保存。',
        ],
      },
      {
        h: '你的选择与权利',
        body: [
          '你可以通过 tools.google.com/dlpage/gaoptout 安装 Google 的浏览器插件退出统计,或在浏览器中屏蔽本站 cookie。无论选择哪种,网站功能都不受影响。',
          '你可通过任意邮件中的退订链接取消订阅。',
          '根据你所在地(如欧盟/英国 GDPR、加州 CCPA),你可能有权访问、更正或删除我们持有的个人数据,并反对某些处理。如需申请,请发邮件至 ' +
            PRIVACY_EMAIL +
            '。',
        ],
      },
      {
        h: '跨境传输',
        body: [
          '我们的托管、统计与邮件服务商位于美国,因此通过本站提交的数据可能在美国处理。',
        ],
      },
      {
        h: '未成年人与政策变更',
        body: [
          '本站面向成年人及企业联系人,不面向 13 岁以下儿童。',
          '我们可能随业务发展更新本政策。重大变更将体现在上方的"最后更新"日期中。',
        ],
      },
      {
        h: '联系我们',
        body: ['关于本政策的问题,请联系:' + PRIVACY_EMAIL + '。'],
      },
    ],
  },
};
