# CODING_STANDARDS（代码规范）

| 项目 | 内容 |
|---|---|
| 更新时间 | 2026-11-03 |
| 目的 | 让 Human 和 AI 用最低认知负担理解并执行 coding rules；代码必须能工作、容易读、容易改、容易验证、容易定位问题。 |
| 文档语言 | 本文件以中文为主；KISS、SOLID、SSOT、Delta-Based I/O、Scale-Safe On-Demand I/O、API、resource、command、code symbol 等 technical terms / proper nouns 保留 English。 |
| Code language | Team code 和 code comments 使用 English；这不代表本规则文档要用 English 写正文。 |
| Canonical source | Common User Preferences 中本文件是 canonical source；所有 coding repo 保留完整 exact local copy，Common 更新后再同步。 |
| 使用方式 | Mandatory Requirements 对每个 coding change 都必须遵守；Conditional Requirements 在对应条件满足后变成 Mandatory。 |
| Review | Coding change 完成 implementation / validation 后，必须按 CODING_STANDARDS_REVIEW.md 逐条检查并输出独立 review report。 |
| History | 旧版本和变化过程由 Git history 保留；本文件只维护 current rules。 |

## Mandatory Requirements

### Engineering Principles

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 | 最小例子 |
|---|---|---|---|---|
| Correctness | 先保证代码真的正确，再谈结构和优化。 | 保持 main flow 可运行；输入、边界、错误路径和现有行为按风险比例验证。 | compile / startup / runtime 已坏，或者没有 evidence 就声称完成。 | Pipeline 改动后至少验证 YAML / command / affected flow。 |
| KISS | 用满足当前需求的最简单方案。 | 优先 direct、small、clear implementation。 | 没有真实需要就增加 layer、wrapper、service、factory、interface、state、config 或 framework。 | 一个清楚 helper 能解决，就不再包多层 pass-through。 |
| No Overengineering / YAGNI | 现在不需要的能力不要提前造。 | 每个 abstraction、layer、state、tool、process、extension point 都必须有当前 requirement / evidence。 | 为“以后可能会用”提前造 framework、config、future-proofing。 | 现在只有一个 provider，就不提前建多 provider framework。 |
| SOLID | Responsibility、ownership、dependency 要清楚。 | Follow relevant SOLID / SRP；Separation of Concerns 清楚；新增相似 case 时优先 extension。 | 把 loading、business rule、persistence、refresh、rendering 混在一个 owner；为了形式上的 SOLID 强行抽象。 | route 只做入口，真实 business responsibility 有清楚 owner。 |
| SSOT | 同一个 domain fact 只能有一个 authoritative source。 | Derived state、cache、UI copy、report 必须能从 SSOT 重建。 | 为方便再建第二份 table / store / local state truth。 | status 只认 API/domain source，不在 UI 再维护一份独立 truth。 |
| Delta-Based I/O | 已经有效的数据继续复用，只处理真正缺少、stale 或 invalidated 的 delta。 | Input 变化后重算 required scope；复用 valid；remote I/O 只做 missing/stale/invalidated subset。 | Scope 一变化就 full reload，或一个 stale item 让 whole dataset 失效。 | [A,C] → [A,C,D] 只 fetch D。 |
| Scale-Safe On-Demand I/O | 一次操作读写多少，只跟这次要显示或真正改动的东西有关，不跟整个数据量一起涨。 | 每条新增 / 修改的 read / write path 写清楚：现在的数据量、10 倍、100 倍时这次操作读写多少；读取有上限（page size / batch size / LIMIT），写入只写真正变化的 rows。 | 打开页面就读整个 table 再在 client 筛选；没有上限的 query；每次运行重写没变化的 rows；只凭“现在数据少”就判断没问题。 | 进 Admin 原来每次读 1.2 万行，1 万件商品时会读 32 万行；改为 server-side search + 每页 30 件后，进 Admin 只读 3 行。 |

### Execution Requirements

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 | 最小例子 |
|---|---|---|---|---|
| Read before writing | 改代码前先把相关对象和调用链读明白。 | 读 current entry point、direct call chain、inputs/config、existing helpers/services、tests 和 authoritative owner。 | 只看 snippet、旧 Chat memory 或猜测就直接改。 | 改 task script 前先读 pipeline、config、target script、helpers。 |
| Reuse existing logic | 写新逻辑前先找已有实现。 | Search codebase；同 contract 已有 owner 就复用；确认重复后才抽最小 shared helper/module。 | 不 search 就复制相似逻辑，或只因表面相似提前 abstraction。 | 已有 parser 就不再写第二个 parser。 |
| Validate before claiming done | 没有实际 evidence，就不能说完成。 | 按 change risk 运行适用 test / typecheck / lint / build / static / runtime / deploy checks；保留 existing behavior；未验证项明确写 UNVERIFIED。 | Tests 没跑、deploy 没证据、performance 没 measurement 就写 PASS / Done。 | Refactor 后运行 affected tests + build，并报告真实结果。 |
| Fix the root cause | 修问题要修产生它的原因，不只修报出来的那一个。 | 先找出根本原因；查同一原因影响到的同类对象和入口；改产生问题的逻辑，并修好所有受影响的数据；报告写出原因、怎么查同类、影响了几个。查过确认真的只有一个时才只修一个，并写明怎么确认的。 | 只手动改报出来的那条数据或那一处就算完成；不查同类。 | 一个商品没价格：查出是“价格核实时间”算法错了，改算法，再补所有同样受影响的商品，而不是只给这一个商品补价格。 |

### General Code Quality

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 | 最小例子 |
|---|---|---|---|---|
| Plain-English mainline | 从入口要能快速看出“说白了做了哪几件事”。 | Main flow、orchestration、summary 命名直接表达主要步骤。 | 细节和 helper 把主线完全藏住。 | load → validate → apply → verify。 |
| Clean code | 代码应该不用猜就能读。 | Flow 自然、side effect 明确、magic behavior 最少。 | 技巧化写法、隐藏约定、隐式 side effect。 | 直白 function 比 clever one-liner 更优先。 |
| Naming | 名字要说明对象、作用和层级。 | 使用具体 domain / action name。 | data、manager、helper、doStuff 这类无法判断职责的名字。 | target_storage_account_ids 比 items 清楚。 |
| Testability | 核心 logic 应尽量能单独验证。 | 计算 / validation 优先 clear input/output；副作用集中。 | 核心 rule 完全绑死 CLI、network、filesystem。 | build_instances(input) return map，再由外层写文件。 |
| Safe refactor boundary | 小改动不要顺手变成 Big Bang refactor。 | 默认只改当前文件和 direct call chain；无关问题先 report。 | 为一个小需求重写整个大文件 / repo。 | 发现无关 duplicate component 时先记录，另开 task。 |
| Avoid growing big entry files | 已有大 index / entry file 不强拆，也不继续塞 business logic。 | Entry file 只加最小 wiring，新 logic 放合适 owner。 | 新 business rule 继续堆进大 index.tsx / index.js。 | index 只 import 并调用 service。 |
| No inline hard-coded values | 会变的值、有业务含义的值不写死在代码里。 | URL、resource ID / 名字、阈值、限额、时间间隔、开关、价格等放进项目已有的、合适的配置位置（config 文件、variables、tfvars、constants 文件）；环境不同的值按环境分开放；secret 只放 secret store；项目已有配置位置时用它，不另造一套。 | 把这类值直接写在 logic 里，或同一个值在多处各写一份。 | `MAX_BATCH = 24` 放在 config / constants 文件，代码里引用它；`0`、`1`、空字符串这类不会变、不言自明的值可以直接写。 |

### Delta-Based I/O — Exact Rule

| 对象 / 情况 | 必须规则 |
|---|---|
| required | 输入变化后重新计算“现在真正需要”的 remote objects。 |
| valid | 已加载并仍然有效的 remote objects。 |
| Reuse | 复用 required ∩ valid。 |
| Fetch / read | 只读取 required - valid。 |
| Stop using | valid - required 直接停止使用，通常不需要 remote read。 |
| Stale / invalidated | 只 reload affected object / dependency subset。 |
| Local recomputation | 可以按 correctness 需要反复重算；优化目标是减少不必要 remote I/O，不是禁止正确的 local recomputation。 |
| Bootstrap | 多个 async inputs 会造成重复 remote reads 时，等待 minimum required inputs 再做第一次 dependent I/O；之后恢复正常 reactive recomputation。 |

| 场景 | 正确做法 | 错误做法 |
|---|---|---|
| [A,B,C] → [A,C] | 复用 A/C，停止使用 B，0 remote reads。 | 因 scope shrink 重新读取 A/C 或 A/B/C。 |
| [A,C] → [A,C,D] | 复用 A/C，只 fetch D，再 merge。 | 重新读取 A/C/D。 |
| 一个 object stale | 只 invalidate / reload affected subset。 | 一个 stale item 触发 whole-set reload。 |

### Scale-Safe On-Demand I/O — Exact Rule

| 对象 / 情况 | 必须规则 |
|---|---|
| Read path | 读取量与屏幕显示 / 用户请求的 item 数成正比，并有明确上限；列表用 server-side search、pagination 或 keyset paging。 |
| On demand | 页面 / 启动只读当前 consumer 立刻要用的数据；Search / Picker / Recommendation / 详情在真实使用时再读。 |
| Many IDs | 多个 IDs 用 targeted batch 并分批；不做 full eager load，也不做 N+1。 |
| Loop / polling | 每一圈只读上一圈之后变了的数据；仍然有效的结果继续用。 |
| 定期任务 | 每周、每天跑的任务：这一轮变了多少，就花多少。读写跟“变了几个”成正比，只多一点固定开销。 |
| 统计数字 | 总数、计数这类算出来的数字，在数据变的时候顺手改；不要每一轮把全部数据重新数一遍。 |
| Write path | 写入量与真正变化的 item 数成正比；内容没变就不写。 |
| Whole-set work | 整表 / 整目录扫描只用于一次性的补数或修数据，必须分批、可续跑、有预算，并经 Human 批准；定期任务不能每一轮都扫全部。 |
| Growth check | 每条新增 / 修改的 read / write path 用当前数据量、10 倍、100 倍估算或实测读写量；不随数据量增长的写明上限。定期任务还要算出一年一共多少（每轮 × 一年几轮）；“没超额度”不能当通过的理由。 |
| Metered store | 按行 / 请求计费或有每日额度的存储（例如 Cloudflare D1 rows read / written）必须用该存储自己的计数作 evidence；“变没变”先在不收费的地方比好（本机、程序内存），只把变了的写进去。 |

## Conditional Requirements

### Conditional Requirement Map

| 条件 | 条件满足后必须遵守 |
|---|---|
| Web App / iOS App / Game runtime | Observability。 |
| 新增或修改 user-visible UI / UX | 先读 existing UI/design evidence → mockup（网页和非游戏 App 用 HTML，游戏用图片；见 `UI_MOCKUP_STANDARDS.md`）→ Human explicit approval → UI code。 |
| Data / state / model / catalogue / remote collection work | Simple data model、Current state vs history、Targeted scope。 |
| 有 performance / scale / timeout 风险或声称“更快” | Performance budget、Avoid repeated expensive work、Scale-aware implementation、Measurement。 |
| Automation / Pipeline / Script | Visible main flow、shallow orchestration、pure/single-job function、environment config separation、template/reuse、preview/apply、scripts location、script/log rules；改了 Pipeline YAML（Azure DevOps、GitHub Actions 或其他 CI/CD）时，写完按 `CODING_STANDARDS_REVIEW.md` 第 12 项 `Pipeline Review Checks` 逐条自检。 |
| 新增或修改 logs | ASD-STE100 / Simplified Technical English、signal-to-noise、header hierarchy、label/value、observable outcome。 |
| Team / shared code | Team Pattern First；team code/comments 使用 English。 |
| React / JavaScript / Web code | Repo-wide clean audit、Proportional audit、Safe refactor boundary。 |
| 出现 environment-specific values | non-secret values 按 environment 分离；secrets 留 approved secret store（值不写死、放进配置，见 Mandatory `No inline hard-coded values`）。 |
| 新增相似 type / case / service boundary | Open/Closed；Service layer 必须有真实 responsibility，禁止纯 pass-through layer。 |
| Personal deployable coding project 的 `main` 出现 code / config / runtime / pipeline change | 自动 validate / build / deploy exact SHA；docs-only change 不 deploy；用 GitHub Actions 时同时遵守 `prompts/common-prompts/rules/GITHUB_ZERO_SPEND_GATE.md`。 |
| Terraform / IaC | 额外读取并遵守 local `prompts/common-prompts/standards/terraform_coding_standards.md`；写完按 `CODING_STANDARDS_REVIEW.md` 第 11 项 `Terraform Review Checks` 逐条自检。 |

### Observability

| 场景 | 必须能看到 | 不能这样做 |
|---|---|---|
| Network / external service | source（适用时）、target/object、action、outcome、failure reason、必要 context。 | 只写 failed、silent failure、默认 dump full payload。 |
| Background / scheduled work | run/action identity、status、affected scope、skip/failure reason。 | 后台 work 没有 outcome evidence。 |
| Persistence / state transition | operation、affected object/scope、success/failure。 | Logging 复制整份 business state，变成第二个 SSOT。 |
| User-visible critical flow | 能区分 input / validation / runtime / external failure。 | 每个低价值 UI interaction 都刷 log。 |

### UI / UX

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| UI Mockup Standard | User-visible UI / UX change 的 mockup 规则只维护一份。 | 读取并遵守 project-root `prompts/common-prompts/standards/UI_MOCKUP_STANDARDS.md`。 | 不得绕过该 Standard 或 Human approval gate。 |

### Data / State / Model

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| Simplest sufficient data model | 一个 model 能准确表达就不要造多个。 | 只有 lifecycle、ownership、invariant、external contract 真不同才增加 model。 | 同一数据在多个近似 models 间无意义转换。 |
| Current state is not history | 只需要 latest state 就维护 current-state SSOT。 | History 只有 audit、evidence、replay、temporal analysis、compliance、point-in-time reconstruction 真需要时才保留。 | 每次 refresh 都 append snapshot，但没有 consumer 使用历史。 |
| Targeted work scope | 一个 object trigger 默认只处理 affected object(s)。 | Explicit whole-set operation / documented invariant 才扩大 scope。 | 一个 stale item 触发 whole Catalogue / table refresh。 |

### Performance / Scale

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| Performance budget | 有 runtime / memory / scale 目标就按预算设计和验证。 | 报告 actual runtime / scale evidence。 | 功能完成但明显超出已知预算。 |
| Avoid repeated expensive work | Expensive API / I/O / full scan / heavy calculation 不重复做。 | 合理 cache / batch / precompute / vectorize。 | Loop 内反复读同一大文件或 list 全量 remote resources。 |
| Scale-aware implementation | 数据量可能变大时避免明显不可扩展复杂度。 | 使用 index / map / bounded query 等合适结构。 | 每条记录都全表 linear search。 |
| Measure before claiming | 不能没 measurement 就说“更快”。 | 给 elapsed time、data size、main bottleneck 等最小 evidence。 | 没跑 measurement 就声称 performance improved。 |
| Performance signal | 长流程需要让人知道是在运行还是卡住。 | 适用时输出 elapsed time、item count、progress summary。 | 长时间无任何 signal。 |

### Automation / Pipeline / Script

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| Main flow visible | 从 pipeline / script 入口就能看出主要 workflow。 | main / orchestration 明确展示 load / validate / preview / apply / verify 等主要步骤。 | 关键 workflow 藏在多层 helper。 |
| Orchestration stays shallow | Orchestration 不做无意义套娃。 | helper 处理 detail，但主线保持少量层级。 | run → do → process → handle → execute 纯转发。 |
| Function does one job | Function responsibility 要清楚；可 pure 时尽量 pure。 | Input/output 清楚，副作用集中。 | 偷读 global/env、同时做多类 unrelated action。 |
| Pipeline calls scripts only | Workflow YAML 负责 orchestration，复杂 logic 放 versioned script/module。 | YAML 调 clear scripts / reusable actions。 | 大段 business logic inline 在 YAML。 |
| Environment config separation | non-secret environment values 分 environment 管理。 | dev / uat / prod 使用 separate env-named files / variable groups；secrets 留 secret store。 | PROD value inline 在 YAML，或 secret 写入 committed config。 |
| Config is data, not code | 配置和逻辑分开。 | Resource IDs、names、flags 放 config/variables；code 负责 behavior。 | 为改 value 去改 logic。 |
| Pipeline templates / shared helpers | 重复 workflow / script logic 只保留一个 owner。 | 使用 template、reusable action、helpers script。 | 多个 pipelines/scripts copy/paste 相同行为。 |
| Preview before apply | 会修改资源时适用 preview → apply。 | Preview 展示 source / target / planned change；apply 才 mutation。 | 一运行就直接改资源，Human 无法先看计划。 |
| Scripts in `scripts/` | 独立脚本统一放在项目根目录的 `scripts/`。 | Human 让 AI 写的检查、拉数据、一次性操作等脚本放 project-relative `scripts/`；HTML / Markdown 里只放链接。Team repo 已经有放脚本的位置时按 Team Pattern First。 | 脚本散在根目录或文档 folder 里，或整段写进 HTML / Markdown 让人复制。 |

### Logging

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| Controlled log language | Log 给人读，使用 ASD-STE100 / Simplified Technical English 风格。 | Common words、active voice、short sentence；technical terms/resource/CLI names 保留 English。 | 套话、长句、模糊词、一行多个意思。 |
| Emoji only for section/header | Emoji 用来分层，不要每行都加。 | 一个 log section/header 一个 emoji。 | 每条 log line 都加 emoji。 |
| Log hierarchy | Main status、step、detail 层级要明显。 | 先 conclusion / status，再必要 context。 | 所有 log 都同一层级。 |
| Label / value | 关键 output 使用 Human-readable label/value。 | Status、Reason、Source、Target 等一眼可扫。 | 把关键信息埋在长句里。 |
| Observable script output | Script 要显示 action、target、status、failure reason。 | 成功/失败与 affected scope 可定位。 | 只有 failed 或无 output。 |
| Avoid noisy logs | 默认只保留 high-signal summary。 | 大列表输出 count / summary；detail 只在 debug/明确需要时打印。 | 默认 dump every item / verbose payload。 |

### Team / Shared Code

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| Team Pattern First | Team 已有 pattern 能满足需求就 follow。 | 先读相近 module/pipeline/naming/tests；只在 existing pattern 明确不能满足 correctness/security/requirement 时提出最小差异。 | 已有成熟 pattern 却无理由另造 parallel design。 |
| Team code language | Team code / comments / team-facing README 使用 English。 | Code 和 comments 保持 English。 | Team repo 出现中文 code comments。 |

### React / JavaScript / Web

| 规则 | 一句话说白了 | 必须怎么做 | 不能怎么做 |
|---|---|---|---|
| Repo-wide clean audit | Web code change 要检查它和整个 repo 的关系。 | 结合 inspection 和 existing lint/typecheck/test/build/dead-code/duplication checks。 | 只看当前 diff，完全不检查 repo-level impact。 |
| Proportional audit | Audit 成本要和 change risk 成比例。 | 优先 existing checks；有 evidence 才深入。 | 为小 change 引入新 tooling / cleanup framework。 |
| Safe refactor boundary | Audit 不等于默认全库重构。 | 实际 refactor 留在当前 scope / direct call chain；无关问题 report。 | 借小 change 顺手改大量无关文件。 |

### Architecture / Config

| 条件 | 规则 | 一句话说白了 |
|---|---|---|
| 新增相似 type / case | Open/Closed | 优先新增 mapping / handler / config，不反复改核心 if/else。 |
| 新增 service boundary | Service Layer Pattern | Service 必须承担真实 business/shared responsibility；禁止只有一行转发的 pass-through layer。 |
