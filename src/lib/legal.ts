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
          'Analytics cookies are controlled by the consent banner shown on your first visit. In the EU, UK, and Switzerland analytics is switched off until you accept; elsewhere it is on by default and you can decline at any time. You can change your choice whenever you like via “Cookie Settings” at the bottom of any page.',
          'You can also opt out of Google Analytics with Google’s browser add-on at tools.google.com/dlpage/gaoptout, or by blocking cookies for this site in your browser. The site works normally either way.',
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
          '统计类 cookie 由首次访问时的同意横幅控制。在欧盟、英国与瑞士,未经你接受不会开启统计;其他地区默认开启,你可随时拒绝。你可以随时通过任意页面底部的「Cookie 设置」更改选择。',
          '你也可以通过 tools.google.com/dlpage/gaoptout 安装 Google 的浏览器插件退出统计,或在浏览器中屏蔽本站 cookie。无论选择哪种,网站功能都不受影响。',
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

// ---------------------------------------------------------------------------
// 服务条款
//
// 本站是 B2B 品牌站:无账户、无在线购买、无用户内容。条款范围因此限定为
// "网站使用条款",不写销售合同条款(采购以另行签署的书面协议为准)。
// 管辖法律条款**故意留空** —— 经营主体与注册地未定,不臆造。
// ---------------------------------------------------------------------------

export const terms: { en: LegalDoc; zh: LegalDoc } = {
  en: {
    title: 'Terms of Service',
    updated: PRIVACY_UPDATED_EN,
    intro:
      'These terms govern your use of the petpawpot.com website. They are website terms of use — they do not by themselves create a purchase, distribution, or supply agreement. Please read them together with our Privacy Policy.',
    sections: [
      {
        h: 'What this website is',
        body: [
          'This site presents the PetPawPot brand, its fresh meal maker, and related information for pet owners and prospective business partners. You can read about the product, browse example recipes, and contact us.',
          'Nothing on this site is an offer to sell or a binding quotation. Prices, specifications, programme times, availability, and certifications may change, and any actual supply relationship is governed by a separate written agreement signed by both parties.',
        ],
      },
      {
        h: 'Information, not veterinary advice',
        body: [
          'Recipes, feeding articles, and nutrition content on this site are general information for pet owners. They are not veterinary diagnosis, treatment, or a prescription for any individual animal.',
          'Animals with medical conditions, and pregnant, nursing, or growing animals, have requirements this site does not attempt to assess. Consult your veterinarian before changing how you feed your pet.',
          'Always follow the machine’s own manual for operating instructions, food-safety handling, and cooking programmes. Where this website and the manual differ, the manual governs.',
        ],
      },
      {
        h: 'The AI Nutritionist is a separate service',
        body: [
          'Links to our AI Nutritionist lead to verabowl.com, which is operated as its own product under its own terms and privacy policy. Your use of that service is governed by those documents, not these.',
        ],
      },
      {
        h: 'Acceptable use',
        body: [
          'Use this site lawfully. Do not attempt to disrupt or gain unauthorised access to it, scrape it at scale, or submit false information through our forms.',
          'When you send us an enquiry, you confirm the details you provide are accurate and that you are entitled to share them.',
        ],
      },
      {
        h: 'Intellectual property',
        body: [
          'The PetPawPot name, logo, site design, photography, and written content are our property or used with permission. You may not copy or reuse them commercially without our written consent.',
          'You may share and print pages for your own reference or for evaluating a possible business relationship with us.',
        ],
      },
      {
        h: 'No warranty; limitation of liability',
        body: [
          'This website is provided “as is.” We work to keep it accurate and available, but we do not warrant that it is error-free, complete, or uninterrupted.',
          'To the maximum extent permitted by law, PetPawPot and its team are not liable for indirect, incidental, or consequential loss arising from your use of this website or reliance on its content. Nothing here limits liability that cannot be limited by law, including liability for death or personal injury caused by negligence.',
        ],
      },
      {
        h: 'Changes and contact',
        body: [
          'We may update these terms as the business grows. Material changes will be reflected in the “last updated” date above, and continuing to use the site means you accept the current version.',
          'Questions about these terms: ' + PRIVACY_EMAIL + '.',
        ],
      },
    ],
  },
  zh: {
    title: '服务条款',
    updated: PRIVACY_UPDATED_ZH,
    intro:
      '本条款约束你对 petpawpot.com 网站的使用。它是网站使用条款,本身不构成采购、经销或供货协议。请与《隐私政策》一并阅读。',
    sections: [
      {
        h: '本网站是什么',
        body: [
          '本站介绍宠鲜鲜(PetPawPot)品牌、鲜食机及相关信息,面向宠物家庭与潜在业务伙伴。你可以了解产品、浏览示例食谱,并与我们联系。',
          '本站任何内容均不构成出售要约或有约束力的报价。价格、规格、程序时长、供货情况与认证状态均可能变更;实际供货关系以双方另行签署的书面协议为准。',
        ],
      },
      {
        h: '信息内容,不是兽医建议',
        body: [
          '本站的食谱、投喂文章与营养内容是面向宠物家庭的一般信息,不是针对某只具体动物的兽医诊断、治疗或处方。',
          '有基础疾病的动物,以及怀孕、哺乳或生长期动物,其需求本站并未尝试评估。改变投喂方式前请咨询你的兽医。',
          '操作方法、食品安全处理与烹饪程序请一律以机器随附说明书为准。本站内容与说明书不一致时,以说明书为准。',
        ],
      },
      {
        h: 'AI 营养师是独立服务',
        body: [
          '指向 AI 营养师的链接会跳转到 verabowl.com。该产品独立运营,适用其自身的服务条款与隐私政策,而非本条款。',
        ],
      },
      {
        h: '可接受使用',
        body: [
          '请合法使用本站。不得试图破坏本站、未经授权访问、大规模抓取,或通过表单提交虚假信息。',
          '你向我们发送询盘时,即确认所提供的信息真实,且你有权提供这些信息。',
        ],
      },
      {
        h: '知识产权',
        body: [
          '宠鲜鲜(PetPawPot)名称、标识、站点设计、图片与文字内容归我们所有或经授权使用。未经我们书面同意,不得复制或用于商业用途。',
          '你可以为自身参考,或为评估与我们的潜在业务合作,分享与打印本站页面。',
        ],
      },
      {
        h: '不作保证;责任限制',
        body: [
          '本网站按"现状"提供。我们努力保持内容准确、服务可用,但不保证其无误、完整或不中断。',
          '在法律允许的最大范围内,宠鲜鲜及其团队不对因你使用本站或依赖其内容而产生的间接、附带或后果性损失负责。本条不限制依法不可限制的责任,包括因过失导致的死亡或人身伤害责任。',
        ],
      },
      {
        h: '变更与联系',
        body: [
          '我们可能随业务发展更新本条款。重大变更将体现在上方的"最后更新"日期中;继续使用本站即表示你接受当前版本。',
          '关于本条款的问题,请联系:' + PRIVACY_EMAIL + '。',
        ],
      },
    ],
  },
};
