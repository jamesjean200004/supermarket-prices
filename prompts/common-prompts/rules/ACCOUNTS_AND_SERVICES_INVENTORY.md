# ACCOUNTS_AND_SERVICES_INVENTORY.md

## Always Mandatory

### 这个规则管什么

- **触发条件**：AI 在任何 repo 里工作时，只要碰到这个项目用的外部服务或账号信息（Human 在 Chat 里说的、config / pipeline / script / tool output 里看到的、AI 自己新建或改的），或操作 Cloudflare Account、新建或改部署目标，或 Human 问“这个项目用的哪个账号 / 哪个服务 / 部署到哪”，就适用。入口见 `AGENTS.md` 的 `账号和服务信息：碰到就记`。
- **为什么**：Human 记不住每个项目用了哪个 Cloud、哪个邮箱、哪个银行、哪个 Apple Developer 账号，要用时找不到。所以 AI 必须把这些信息记进 repo，Human 以后直接问 AI，AI 从 repo 里查出来回答。
- **记在哪**：每个 repo 一页单独的信息汇总 HTML：`info-summary/YYYY-MM-DD-账号和服务-信息汇总-Summary.html`（日期是第一次创建的日期，以后不改）。它是这个项目“用什么服务、用哪个账号、部署到哪”的 canonical source；`AGENTS.md` 和本文件只放规则，不放具体账号。
- **为什么是 HTML**：所有汇总信息统一用信息汇总 HTML，不再单独用 Markdown（2026-11-13 Human 定）；这一页和其他信息汇总一样，按 `prompts/common-prompts/rules/INFO_SUMMARY_HTML_RULES.md` 和 `HTML_PAGE_RULES.md` 写，写完按 `prompts/common-prompts/review/INFO_SUMMARY_HTML_REVIEW.md` 检查。
- **只有一页**：一个 repo 只有一页账号和服务汇总，所有服务和账号都放这一页；不分散写进各个任务的信息汇总。任务页提到账号时只写一句结论，再链接到这一页。

### 记什么

只记这个项目真的在用、而且有 evidence 的信息；没用到的类别不画分区。常见类别：

| 类别 | 例子 |
|---|---|
| **Cloud / Hosting** | 部署到哪个 Cloud（Cloudflare、Azure、Vercel……）、哪个 Account、登录用的哪个邮箱。 |
| **Domain / DNS** | 域名在哪里买的、DNS 在哪管、用哪个账号。 |
| **Code / Pipeline** | GitHub 账号或 Organization、CI/CD 用什么（GitHub Actions、Azure Pipelines……）、deploy 用的 service account / service principal / API Token 的**名字**和它属于哪个账号。 |
| **App Store** | Apple Developer 账号（个人还是公司 Organization、Team 名、登录邮箱）、App Store Connect、Google Play Console。 |
| **公司和钱** | 用哪个公司主体、哪个银行、账户名、账户尾号 4 位、收款或支付服务（Stripe、PayPal……）用哪个账号。 |
| **其他第三方服务** | 邮件、分析、AI API、监控等：服务名、账号、用来做什么。 |

- **Cloudflare 资源也在这一页**：Cloudflare Account 一个方块，Account 下面用到的资源各一个方块，详情里写这些（只写当前 config / tool evidence 能确认的）：
  - **Account**：Account name；Account ID 只在 config 或 tool 能确认时写。
  - **Workers**：Worker / service / script 名字、environment，和项目相关的 route / hostname。
  - **D1**：Database 名字、`database_id`、binding。
  - **AI**：Workers AI / AI Service binding、service / model、用来做什么（只写项目真的在用的）。
  - **其他**：KV、R2、Queues、Vectorize、Pages 等只在真的用到时写。
  - **来源**：从哪个 config / tool / runtime 看到的，最后确认日期。
- **部署目标也在这一页**：每个部署目标（Production、Preview、TestFlight 等）一个方块，写在它所在的 Cloud / App Store 分区里，详情写：环境、平台（Cloudflare Pages / Workers、Expo EAS、App Store Connect……）、账号名和不是 secret 的账号 ID、平台上的 project / service 名、公开 URL 或发布渠道、哪个 workflow 文件部署（`.github/workflows/<文件>.yml`）、什么时候触发、必须通过的 check 和 deploy job 名字、最后一次验证过的部署（日期、commit、run 链接、结果）、要的 secret 名字和存在哪。还没配好的写 `Not configured` 加卡在哪；要 Human 做的账号步骤（签名、付费、批准）写进状态块；workflow 文件没有、真跑没验证过时，不写“已自动部署”。
- **以前的 `.md` 不再建**：以前写在 `CLOUDFLARE_RESOURCES.md` 和 APP Skill 要求的 `DEPLOYMENT.md` 里的内容都写在这一页（2026-11-13 Human 定）；repo 里还有这两个文件时，照 `PROJECT_STATE_RULES.md` 的 `旧文件过渡` 搬进来再删。

### 不记什么

- **Secret 不记**：API Token、secret value、password、private key、recovery code、session / cookie 都不写，只写名字和存在哪里（例如 “GitHub secret `CLOUDFLARE_API_TOKEN`”）。
- **完整号码不记**：银行账号、信用卡号只写银行名、账户名和尾号 4 位；护照、驾照、税号等证件号不写，只写“在哪里能查到”。原因：repo 被看到时，完整号码加上账户名就能被拿去冒用；尾号已经够 Human 认出是哪个账户。
- **不猜**：没有 evidence 的不写；Human 说的但还没核对的，来源写 `Human 说（UNVERIFIED）`，方块标黄色“待确认”。

### 这一页怎么写

从 `prompts/common-prompts/templates/INFO_SUMMARY_TEMPLATE.html` 开始，固定 5 块照常有，每块放这些：

- **① 结论**：一句话写这个项目用了哪些外部服务；关键事实写服务数量、主要部署在哪、代码在哪、最后一次全部核对的日期。
- **② 主图**：分区架构图：每个类别一个分区框，框里一个服务的一个账号一个方块，方块写 `服务名 · 账号`；分区框超过 5 个就把小类别并进“其他第三方服务”。点方块看详情：账号（邮箱 / 用户名 / Team）、用来做什么、secret 的名字和存在哪、来源、最后确认日期。
- **③ 状态**：哪些还是 `UNVERIFIED` 待确认、哪些要先处理（例如账号快过期、要续费）；都核对过时写一张卡“全部核对过”。
- **④ 时间线**：什么时候加了哪个服务、什么时候换了账号（例如“2026-11-13 Apple Developer 从个人账号换成公司账号”）；点时间点看来源。
- **⑤ Q&A**：Human 会问的问题，例如“部署到哪？”“GitHub 用哪个账号？”“钱进哪个银行？”，答案一两句，指向主图里的方块。

- **来源写清楚**：来源写 config 文件路径、tool 输出、或 `Human 2026-11-13 在 Chat 说`；日期写最后一次确认的 `YYYY-MM-DD`。
- **换了就改那个方块**：账号或服务换了，直接改那个方块，在时间线加一个点写旧的用到哪天；不留两个互相冲突的方块。
- **放进总索引**：这一页算第 2 层“没有 Ticket 的独立主题”，在 `info-summary/信息汇总-Summary-索引.html` 里有一行。
- **没有就不建**：项目还没碰到任何这类信息时，不建空页面。
- **repo 里还没有 `info-summary/`**：先照 `INFO_SUMMARY_HTML_RULES.md` 的 `共用样式和脚本` 复制 `info-summary/assets/`，再从模板建总索引和这一页。

## Scenario-Based Mandatory

### 碰到就记，当轮写

- **当轮写**：AI 本轮碰到新的、或和页面上不一样的服务 / 账号信息，当轮就更新账号和服务汇总；不等到任务结束。
- **和工作同一个 PR**：更新放进本轮工作的同一个 commit / PR；本轮没有别的修改时（例如 Human 只是在 Chat 里说了一个账号），单独按这个 repo 平常的方式提交，Personal Project 照 `AGENTS.md` 的 `Personal Project 同意过就直接开 PR`。
- **发回答前自检**：每条回答发出前，按 `AGENTS.md` 的 `Answer Review` 第 10 项查：本轮碰到的服务和账号信息都记进去了吗？有没有写进 secret 或完整号码？
- **读不到 repo 时**：浏览器 Chat 读不到项目时写不了文件，在回答里列出要记的信息，请 Human 在能读到项目的 AI 里补记。

### 操作 Cloudflare 或改部署目标

- **操作前先读**：Human 要 AI 操作 Cloudflare Account，或新建 / 改 APP、Game 的部署目标时，先读当前 repo 的 config / pipeline / script 和账号和服务这一页；不凭记忆猜 Account、resource 或部署目标。
- **同一个 change 里改**：本轮确认、新建、改或删了 Cloudflare resource、部署目标、账号、project、域名、渠道或 workflow，就在同一个 commit / PR 里改这一页的方块和时间线。
- **没变不改**：resource 和部署目标都没变，就不为它制造 commit。

### Human 问账号在哪

- **先读这一页**：Human 问“这个项目用的哪个账号 / 部署到哪 / 哪个银行”时，先读 `info-summary/` 里的账号和服务汇总回答，并说出来源和最后确认日期。
- **页面里没有**：去 config / pipeline / script 找；找到了就回答并补进页面；找不到就直接说不知道，不猜。
- **问现在的状态**：Human 问 live / 现在是不是还这样时，用当前 config 或 tool 再核对一次，变了就改页面。
