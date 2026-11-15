# CODING_STANDARDS_REVIEW（代码审核规范）

| 项目 | 内容 |
|---|---|
| 更新时间 | 2026-11-15 |
| 目的 | CODING_STANDARDS_REVIEW 回答的是 HOW TO VERIFY：代码改完以后，怎么逐条确认它符合 Coding Standards。 |
| 文档语言 | 本文件以中文为主；KISS、SOLID、SSOT、Delta-Based I/O、Scale-Safe On-Demand I/O、API、resource、command、code symbol 等 technical terms / proper nouns 保留 English。 |
| 适用范围 | 每个实际修改 code / config / pipeline / runtime behavior 的任务都必须执行；docs-only 且没有代码行为变化时不触发。 |
| 对应关系 | 本文件必须镜像 CODING_STANDARDS.md；Standards 规定“必须怎么做”，Review 只检查“有没有做到”，不维护第二套规则。 |
| History | 旧版本和变化过程由 Git history 保留；本文件只维护 current review contract。 |

## Mandatory Requirements

### Review Output Contract

| 规则 | 一句话说白了 |
|---|---|
| 独立 Chat Section | Coding task 完成 implementation / validation 后，Human-facing response 必须单独输出顶层 section：## 🔑 Coding Standards Review。 |
| Mandatory checks | AI 每次都按顺序逐条检查下方 14 个 Mandatory checks；第 11、12 项在本次没有改 Terraform / Pipeline 时算 ⚪N/A，改了就按对应清单逐条检查；第 13 项在本次不是修问题时算 ⚪N/A；第 14 项在本次没有新增或修改任何值时算 ⚪N/A。检查照做，输出按下面 `Coding Standards Review Report Shape` 压缩。 |
| Status | 每项使用 ✅符合 / ❌不符合 / ⚪N/A / 🟡UNVERIFIED。 |
| Evidence | 每一项检查都必须有最小真实 evidence（实际跑过的命令、读过的文件、diff）；⚪N/A 要有原因；🟡UNVERIFIED 要说清缺什么 evidence。全部通过时 evidence 不写进回答，但 Human 问起时必须能给出。 |
| Conditional checks | 对当前 change 满足条件的 Conditional Review 必须逐条检查；不适用的类别不机械展开。 |
| No fake PASS | Test/build/runtime/deploy 没有实际 evidence 时不得写 ✅符合。 |
| Language | Report 以中文为主，technical terms / code symbols / commands / resource names 保留 English。 |
| Fix loop | 如果发现 ❌不符合且在当前 scope 内可安全修复，先修复，再重新检查那几个 ❌ 和改动碰到的地方（什么算 ❌、最多几轮，按 `AGENTS.md` 的 `Review 有终点`）；不能把已知 violation 直接包装成 Done；修不了的 ❌ 必须出现在 ⚠️ 表里。 |

### Mandatory Review Checks

| # | 检查项 | 一句话说白了 | 怎么判断 | Evidence |
|---:|---|---|---|---|
| 1 | Correctness | 主流程和 changed behavior 真的正确吗？ | 检查 compile/startup/main flow、输入/边界/error path、existing behavior 和 relevant validation。 | test / build / runtime / static evidence。 |
| 2 | KISS | 是不是最简单充分方案？ | 检查是否有不必要 layer、wrapper、service、factory、interface、state、config、framework。 | diff + architecture/call-chain evidence。 |
| 3 | No Overengineering / YAGNI | 有没有为了未来可能性提前造东西？ | 每个 abstraction、state、tool、process、extension point 都要能对应当前 requirement/evidence。 | requirement + diff。 |
| 4 | SOLID | Responsibility / ownership / dependency 清楚吗？ | 检查 SRP、Separation of Concerns、dependency direction；不能为形式上的 SOLID 强行 abstraction。 | code structure / call chain。 |
| 5 | SSOT | 同一个事实有没有第二份 authoritative truth？ | 检查 UI/service/storage/cache/report 是否独立维护同一 domain fact。 | data flow / storage ownership。 |
| 6 | Delta-Based I/O | Remote I/O 是否只处理真正的 delta？ | 重算 required；复用 valid；只读 missing/stale/invalidated；scope shrink 不 refetch。 | query/call/runtime evidence。 |
| 7 | Scale-Safe On-Demand I/O | 每次读写是否只跟要显示 / 真正变化的东西有关、有上限？ | 每条新增 / 修改的 read / write path 列出当前、10 倍、100 倍数据量时的读写量或上限；读取分页 / 搜索 / 分批，写入只写变化；定期任务写出每个变化的对象读写几次、一年一共多少，“没超额度”不算通过。 | query plan / row counts / metered-store counts（如 D1 rows read / written）。 |
| 8 | Read before writing | 实现前是否读了真正相关的 current code？ | 检查 entry point、direct call chain、inputs/config、existing helpers/services、tests、authoritative owner。 | 实际读取/inspection evidence。 |
| 9 | Reuse existing logic | 有没有重复造已有实现？ | Search existing implementation；同 contract 已有 owner 就复用；shared extraction 只在 duplication proven 后做。 | search + code evidence。 |
| 10 | Validate before claiming done | 是否真的验证后才说完成？ | 检查适用 test/typecheck/lint/build/static/runtime/deploy；performance claim 有 measurement；未验证项明确标出。 | actual command/result/deploy/runtime evidence。 |
| 11 | Terraform 自检 | Terraform 代码有没有逐条对照 Terraform 标准？ | 本次改了 `.tf`、`.tfvars`、Terraform module 或 caller 时，按下方 `Terraform Review Checks` 逐条报告；没改写 ⚪N/A。 | 每一条的 Status + Evidence；或 N/A 原因（例如“本次没有 .tf / .tfvars 改动”）。 |
| 12 | Pipeline 自检 | Pipeline 代码有没有逐条对照 Pipeline 标准？ | 本次改了 Azure DevOps Pipeline、GitHub Actions workflow、可复用的 pipeline template / action，或其他 CI/CD YAML 时，按下方 `Pipeline Review Checks` 逐条报告；没改写 ⚪N/A。 | 每一条的 Status + Evidence；或 N/A 原因（例如“本次没有 pipeline YAML 改动”）。 |
| 13 | Fix the root cause | 修问题时修了根本原因和同类，而不只是报出来的那一个吗？ | 写得出根本原因；查过同一原因影响到的同类对象和入口；改的是产生问题的逻辑，受影响的数据都修好了；只修了一个时写明怎么确认只有一个。本次不是修问题写 ⚪N/A。 | 根本原因 + 查同类的方法和受影响数量 + 改动位置。 |
| 14 | No inline hard-coded values | 新增或修改的值有没有写死在代码里？ | URL、resource ID / 名字、阈值、限额、时间间隔、开关、价格等放在项目已有的合适配置位置（config 文件、variables、tfvars、constants 文件）；环境不同的值按环境分开；secret 只在 secret store；同一个值没有多处各写一份。本次没有新增或修改值写 ⚪N/A。 | 搜过的写死值 + 放到的配置位置。 |

### Terraform Review Checks

第 11 项适用时逐条报告。规则正文在 `prompts/common-prompts/standards/terraform_coding_standards.md`，本表只检查有没有做到。

| # | 检查项 | 一句话说白了 | 怎么判断 | Evidence |
|---:|---|---|---|---|
| TF1 | 环境值不写死 | DEV / UAT / PROD / Sandbox 会变的值有没有写死在 resource / module 逻辑里？ | resource name、SKU、CIDR、subscription / resource ID 都从 variable 输入。 | 搜过的写死值 + 对应 variable。 |
| TF2 | 一个环境一个 tfvars | 每个环境有没有自己明确命名的 values file？ | 例如 `tfvars/dev.tfvars`、`tfvars/prod.tfvars`；没有一个文件混多个环境、靠注释切换；pipeline 每个环境只加载自己的 tfvars。 | tfvars 文件列表 + pipeline 加载的文件。 |
| TF3 | variable 定接口，tfvars 给值 | `variables.tf` 是不是只定义“需要什么”？ | variable 有 type、description，受限输入有 validation；default 只放和环境无关的值，不放 production resource ID。 | 新增 / 修改的 variable 定义。 |
| TF4 | secret 不进 tfvars | 有没有 password、token、key 写进 commit 的文件？ | secret 从 TFC / TFE variable、GitHub / ADO secret、Key Vault 等注入。 | secret 搜索结果 + 注入方式。 |
| TF5 | locals 只放推导值 | 计算出来的值是不是放在 `locals`，而不是暴露成 input？ | naming suffix、derived tags、resource map 转换用 locals；不为形式把纯计算值变成 variable。 | 新增 locals / variables 对照。 |
| TF6 | Module 设计 | module 接口小、和环境无关、output 只给真正需要的吗？ | 没有巨型 variable 列表或一个巨型 object；reusable module 里没有环境身份；output 只给 caller 真用到的值；能复用的已有 module 就复用。 | module 接口 diff + caller 用到的 output。 |
| TF7 | 稳定的 resource identity | resource 身份会不会因为列表顺序变化被重建？ | 需要稳定身份时用 `for_each` 加稳定 key，不用 index（`count`）作身份。 | `for_each` / `count` 用法。 |
| TF8 | 高风险变更已标出 | plan 里有没有会重建或删除资源的高风险变化？ | resource 地址变化、`for_each` key 变化、provider 变化、moved / import、destroy / recreate 都已在报告里点名并说明原因；没有手动改 state（除非本 task 明确要求、且经过 review）。 | plan 里的 create / update / destroy 数 + 点名的高风险项。 |
| TF9 | fmt / validate / plan 实际跑过 | 说做完之前，有没有真的跑过这三步？ | `terraform fmt`、`terraform validate` 和合适的 plan / 静态检查都有真实结果；跑不了的标 🟡UNVERIFIED 并说明缺什么。 | 实际命令 + 结果。 |
| TF10 | Team 交付流程 | Team 环境有没有走既有的 approval / plan / apply 流程？ | Team repo 按 Team Pattern First 和既有流程；Personal Project 的 direct-to-main 不用在 Team 环境。 | 走的流程 + 批准记录。 |

### Pipeline Review Checks

第 12 项适用时逐条报告。规则正文在 `prompts/common-prompts/standards/CODING_STANDARDS.md` 的 `Automation / Pipeline / Script` 和 `Conditional Requirement Map`，本表只检查有没有做到。

| # | 检查项 | 一句话说白了 | 怎么判断 | Evidence |
|---:|---|---|---|---|
| PL1 | 主流程一眼看出 | 从 pipeline 入口能不能看出主要步骤？ | stages / jobs / steps 的名字直接说明 load / validate / preview / apply / verify 等主要步骤；关键流程没有藏在多层 template 里。 | 入口文件的 stage / job 列表。 |
| PL2 | YAML 只做编排 | 复杂逻辑有没有写在 YAML 里？ | YAML 调用 versioned script / module / reusable action；大段 business logic 不 inline 在 YAML。 | inline script 行数 + 调用的脚本。 |
| PL3 | 编排不套娃 | template 有没有一层层纯转发？ | template / reusable action 有真实职责；没有只做转发的多层套娃。 | template 调用链。 |
| PL4 | 环境配置分开、secret 不进代码 | dev / uat / prod 的值是不是分开管理？ | non-secret 值放各环境自己的 file / variable group；PROD 值不 inline 在 YAML；secret 只来自 secret store（ADO secret variable / variable group、GitHub secret、Key Vault），不写进 commit。 | 各环境配置位置 + secret 来源。 |
| PL5 | 配置是数据 | 改一个值要不要改逻辑？ | resource ID、名字、flag 在 config / variable 里；改值不用改 step 逻辑。 | config / YAML diff。 |
| PL6 | 复用模板 | 重复的 workflow 逻辑是不是只有一个 owner？ | 重复步骤用 template、reusable action 或 helper script；没有多个 pipeline 复制粘贴同一段。 | repo 搜索结果。 |
| PL7 | 先 preview 再 apply | 会改资源的 pipeline 有没有先给人看计划？ | 适用时先 preview（例如 `terraform plan`、what-if），展示 source / target / 计划变化，apply 才真正修改。 | preview / apply 的 stage 顺序。 |
| PL8 | 脚本放 `scripts/` | pipeline 调用的独立脚本放对位置了吗？ | 新增脚本在 project-relative `scripts/`；Team repo 已有放脚本的位置时按 Team Pattern First。 | 脚本路径。 |
| PL9 | GitHub `$0` | GitHub Actions 改动会不会产生付费？ | 遵守 `prompts/common-prompts/rules/GITHUB_ZERO_SPEND_GATE.md`：不用付费 runner、不改 budget、额度用完时改做 local validation；不是 GitHub Actions 写 ⚪N/A。 | runner 类型 + 额度 / budget evidence。 |
| PL10 | 实际验证过 | pipeline 改动有没有真的验证？ | YAML 语法 / schema 检查、dry run、preview run 或实际 run 有真实结果；跑不了的标 🟡UNVERIFIED 并说明缺什么。 | 实际命令 / run 链接 + 结果。 |

### Delta-Based I/O Minimum Mental Checks

| 场景 | Review 必须确认 |
|---|---|
| [A,B,C] → [A,C] | A/C 复用，B 停止使用，0 remote reads。 |
| [A,C] → [A,C,D] | A/C 复用，只 fetch D，再 merge。 |
| One object stale | 只 invalidate / reload affected subset，不做 global reload。 |

### Scale-Safe On-Demand I/O Minimum Mental Checks

| 场景 | Review 必须确认 |
|---|---|
| 打开页面 / 启动 | 只读当前立刻显示的数据；不读整个 table。 |
| 列表 / Search / Picker | Server-side search 或分页，每次有上限；数据量 ×100 时单次读取不变或仍有上限。 |
| 多个 IDs | Targeted batch 并分批；没有 N+1。 |
| 循环 / 轮询 | 每一圈只读变了的数据，不重读同一批。 |
| 写入 / 定时任务 | 只写真正变化的 rows；这一轮变了多少就花多少；整表扫描只用于一次性补数，并经 Human 批准。 |
| 统计数字 | 总数在数据变的时候顺手改，不是每一轮重新数。 |
| 计量存储 | 有该存储自己的 rows read / written 计数作 evidence；比对放在不收费的地方做，只写变化。 |

### Coding Standards Review Report Shape

和 `AGENTS.md` 的 `Answer Review` 一样：检查全部照做，回答里只写结果，有问题才展开。

| 情况 | 回答里怎么写 |
|---|---|
| 全部 ✅ / ⚪N/A | 只写一行：`✅ N/14 通过，M 项 N/A`。第 11、12 项适用时在同一行补清单结果，例如 `；Terraform 10/10、Pipeline 9/10 通过，1 项 N/A`；有适用的 Conditional checks 时补 `；条件检查 a/b 通过`。 |
| 有 ❌ 或 🟡 | 先写一行 `⚠️ N/14 通过，M 项 N/A，K 项要注意：`，再用三列表（检查、状态、证据）只列 ❌ / 🟡 的那几项（包括清单里的 TF / PL 条目和 Conditional checks），按检查顺序，每行一句真实证据。 |
| 本轮因 review 修过东西 | 在那一行后面补一句修了什么。 |
| Docs-only，没有代码行为变化 | 整个 section 只写 `➖ N/A`。 |

## Conditional Requirements

### Conditional Review Map

| 条件 | 必须 Review |
|---|---|
| Web App / iOS App / Game runtime | Observability。 |
| User-visible UI / UX change | `UI_MOCKUP_STANDARDS.md` compliance + Human approval gate。 |
| Data / state / model / catalogue / remote collection work | Simple data model、Current state vs history、Targeted scope。 |
| Performance / scale / timeout 风险或 performance claim | Performance budget、Repeated work、Scale、Measurement、Performance signal。 |
| Automation / Script（独立脚本、自动化任务；Pipeline YAML 用 Mandatory 第 12 项） | Workflow visibility、orchestration、function responsibility、env config、template/reuse、preview/apply、scripts location。 |
| 新增或修改 logs | Log wording、hierarchy、signal-to-noise、label/value、observable outcome。 |
| Team / shared code | Team Pattern First、English code/comments。 |
| React / JavaScript / Web code | Repo-wide clean audit、Proportional audit、Safe refactor boundary。 |
| Environment-specific values | Per-environment separation、secret boundary。 |
| 新增相似 case / service boundary | Open/Closed、Service Layer Pattern。 |

### Conditional Review Checks

| 条件 / 检查项 | 一句话说白了 | 怎么判断 | Evidence |
|---|---|---|---|
| Observability | 出问题时能不能快速知道哪个对象、哪一步、结果和原因？ | 检查 source（适用时）、target/object、action、outcome、failure reason；避免 noisy dump / second truth。 | logs / diagnostics / runtime output。 |
| UI mockup approval | UI code 前是否完整遵守 `UI_MOCKUP_STANDARDS.md` 并取得 Human approval？ | 按该 Standard 检查适用 requirements；mockup 格式对（网页和非游戏 App 是 `.html`，游戏是图片）；HTML mockup 按目标宽度在浏览器里实际打开过；approval 必须发生在 implementation 前。 | mockup 文件路径和格式 + 打开过的宽度 + approved mockup / conversation / repo evidence。 |
| Simplest sufficient data model | Models 是不是最少且边界真实？ | 额外 model 必须对应 lifecycle、ownership、invariant、external contract。 | model/schema diff。 |
| Current state vs history | 只需要 latest state 时是否误建 append-only history？ | Current state 用 UPDATE/UPSERT；history 有真实 consumer / audit need。 | schema/query/consumer evidence。 |
| Targeted work scope | 单对象 trigger 是否只处理 affected object(s)？ | Whole-set work 只能来自 explicit reconciliation / documented invariant。 | call/query scope evidence。 |
| Performance budget | 是否满足已知 runtime/memory/scale budget？ | 比较 actual evidence 与目标。 | timings / memory / scale result。 |
| Avoid repeated expensive work | 有没有重复 API/I/O/full scan/heavy calculation？ | 检查 loop / call frequency / caching / batching。 | profiling / call evidence。 |
| Scale-aware implementation | 数据变大后是否有明显 O(n²) / unbounded path？ | 检查 lookup/query/loop complexity。 | code + data-size evidence。 |
| Measure before claiming | “更快”是否有 measurement？ | 没 measurement 不允许 performance PASS。 | before/after or minimum timing evidence。 |
| Performance signal | 长流程是否能看出运行进度/耗时？ | 适用时有 elapsed/item count/progress summary。 | runtime output。 |
| Main flow visible | Pipeline / script 入口能否一眼看出 workflow？ | Main/orchestration 显示主要 steps；复杂 logic 不埋在 YAML。 | file/call-chain evidence。 |
| Orchestration shallow | 是否存在纯转发的多层套娃？ | Helper 负责 detail，orchestration 保持少量层级。 | call chain。 |
| Function does one job | Function 是否职责单一、副作用清楚？ | Input/output 清楚；pure where possible；side effects 集中。 | function/code evidence。 |
| Environment config separation | Non-secret env values 是否按 environment 分开？ | dev/uat/prod separate file/group；secret 留 secret store。 | config/workflow evidence。 |
| Config is data, not code | 改 value 是否不需要改 logic？ | IDs/names/flags 在 config/variables。 | config/code diff。 |
| Pipeline templates / shared helpers | 重复 workflow/script logic 是否只有一个 owner？ | template/reusable action/helpers 复用。 | repo search + file evidence。 |
| Preview before apply | Mutation 是否在适用时先 preview？ | Preview 展示 source/target/change，apply 才 mutation。 | pipeline/script flow。 |
| Scripts in `scripts/` | 独立脚本是不是放在 `scripts/`？ | 新增的脚本在 project-relative `scripts/`（Team repo 按 Team Pattern First）；文档里只放链接。 | 文件路径 + 链接位置。 |
| Controlled log language | Log 是否短、直接、可扫？ | ASD-STE100 / Simplified Technical English；technical terms 保留。 | log text。 |
| Emoji header only | Emoji 是否只用于 section/header？ | 一个 section 一个 emoji，不是每行 emoji。 | log output/code。 |
| Log hierarchy | Status / step / detail 层级是否明显？ | 先 conclusion/status，再必要 context。 | log output。 |
| Label / value | 关键结论是否用清楚 label/value？ | Status、Reason、Source、Target 等易扫读。 | output example。 |
| Observable script output | Script 是否显示 action、target、status、failure reason？ | 成功/失败和 affected scope 可定位。 | runtime logs。 |
| Avoid noisy logs | 默认 output 是否 high-signal？ | 大列表 summary/count；detail 只 debug/明确需要。 | log output。 |
| Team Pattern First | Team existing pattern 能满足时是否 follow？ | 读相近 module/pipeline/naming/tests；无理由不造 parallel design。 | repo pattern + diff。 |
| Team code language | Team code/comments 是否 English？ | Code、comments、team-facing README 检查。 | diff。 |
| Repo-wide clean audit | Web change 是否检查 repo-level clean code risk？ | 使用 existing lint/typecheck/test/build/dead-code/duplication checks + inspection。 | command/result + inspection。 |
| Proportional audit | Audit 是否与 change risk 成比例？ | 小 change 不引入新 tooling / cleanup framework。 | scope + commands。 |
| Safe refactor boundary | 实际 refactor 是否留在 safe scope？ | 当前文件/direct chain；无关问题 report。 | changed files / diff。 |
| Open/Closed | 新相似 case 是否主要靠 extension？ | mapping/handler/config 优先，不反复改核心 if/else。 | code structure。 |
| Service Layer Pattern | Service 是否有真实 responsibility？ | 禁止一行纯转发 layer；有 business/shared responsibility 才存在。 | call chain / service code。 |
