# PROJECT_STATE_RULES.md

## Scenario-Based Mandatory

触发条件：Coding Repo 的 tracked bounded task；Knowledge Hub 内容工作；创建、修改或清理入口状态文件、总索引 `info-summary/信息汇总-Summary-索引.html`、规则信息汇总；repo 里还有旧的 `ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md`、`KNOWLEDGE_MAP.md`、`project-rules/`、`UNDERSTANDING_LOG.md`、`CLOUDFLARE_RESOURCES.md` 或 `DEPLOYMENT.md`。入口见 `AGENTS.md` 的 `规则索引：什么任务读哪个文件`；"开工先读、做的过程中和做完就改"的 Always Mandatory 一句话版在 `AGENTS.md` 的 `任务状态：开工先读，做的过程中和做完就改`。

### Human 会读的都写成信息汇总（2026-11-13 起）

- **为什么**：Human 读 Markdown 很吃力；信息汇总 HTML 有图、颜色和折叠，Human 一眼看得懂（2026-11-13 Human 定）。所以 Human 会读的项目状态和记录，都写成 `info-summary/` 里的信息汇总，`.md` 只留给 AI 读的东西。
- **写成信息汇总的**：下表左列的旧 `.md` 不再新建；内容写进右列的信息汇总。

| 旧 `.md` | 现在写在哪 |
|---|---|
| `ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md`（任务索引） | 总索引 `info-summary/信息汇总-Summary-索引.html`：任务和信息汇总都在这一页，一行一个（写法见下面 `总索引 = 任务 + 信息汇总`）。 |
| `KNOWLEDGE_MAP.md`（知识导航） | 不要了：信息汇总和文档都列在总索引里；规则文件在 `AGENTS.md` 的 `规则索引`。 |
| `project-rules/<对象>.md`（定下的规则） | 一个对象一页规则信息汇总 `info-summary/YYYY-MM-DD-<对象>-规则-信息汇总-Summary.html`（写法见下面 `规则信息汇总 = 已定下的规则`）。 |
| `UNDERSTANDING_LOG.md`（看不懂 / 写得好的记录） | 一页看不懂记录 `info-summary/YYYY-MM-DD-看不懂记录-信息汇总-Summary.html`（写法见 `prompts/common-prompts/explain/LAYERED_EXPLANATION.md` 的 `记进看不懂记录`）。 |
| `CLOUDFLARE_RESOURCES.md`、`DEPLOYMENT.md`（Cloudflare 资源、部署目标） | 账号和服务信息汇总（规则见 `prompts/common-prompts/rules/ACCOUNTS_AND_SERVICES_INVENTORY.md`）。 |
| 给 Human 看的文档（说明、计划、runbook 等） | 一份文档一页信息汇总，放进总索引；Team 规定格式的文档和 `README.md` 照原来的格式。 |

- **保留 `.md` 的**：AI 读的入口和规则（`AGENTS.md`、`CLAUDE.md`、`WEBCHAT_AGENTS.md`、`PROJECT_LOCAL_OVERRIDES.md`、`prompts/common-prompts/` 下的规则和 `skills/` 下的 Skill）；AI 照着写的 Markdown 例子（`ANSWER_EXAMPLE.md`、`MESSAGE_EXAMPLE.md`，因为 Chat 回答和 message 本身就是 Markdown）；`history/` 里的原文归档；只读的旧 HLF；`README.md`（GitHub 首页显示）。
- **旧说法不照做**：旧规则、旧 prompt、README、模板或 Skill 里还叫 AI 新建或更新左列文件时，不照做，以本文件为准。

### Repository mandatory entry-state structure

所有 Repository 的 root-level 入口状态文件统一为：

1. `AGENTS.md` — Common AI 工作规则；所有适用 repo 保持 exact copy。
2. `CLAUDE.md` — Claude Code 自动读取的入口，只导入 `AGENTS.md` 和 `PROJECT_LOCAL_OVERRIDES.md`；所有适用 repo 保持 exact copy。
3. `WEBCHAT_AGENTS.md` — 网页 Chat 回答 Generic 问题时用的规则（`AGENTS.md` 回答标准和安全门槛的压缩版）；Human 明确要网页 Chat 操作某个 repo 时，先查能不能操作，能就严格照那个 repo 的 `AGENTS.md`；所有适用 repo 保持 exact copy。
4. `PROJECT_LOCAL_OVERRIDES.md` — **只扩展 AGENTS.md**，保存当前 Repository 独有 rules / preferences / exceptions；和 Common 规则冲突时以它为准（见 `AGENTS.md` 的 `冲突以 override 为准`）。

任务状态不再放 root 文件，放在 `info-summary/信息汇总-Summary-索引.html`（总索引）。

这几个 root folder 按需存在，不是 root entry file：

- **`info-summary/`**：信息汇总 HTML 和总索引，规则见 `prompts/common-prompts/rules/INFO_SUMMARY_HTML_RULES.md`。
- **`high-level-flow-index/`**：2026-11-02 以前的 HLF，只留作历史，不再新建或更新（见下面 `HLF 停用`）。
- **`history/`**：重构时删掉的旧文件原文，`YYYY-MM-DD-...` 命名，只读。

固定读取顺序：

```text
AGENTS.md（Claude Code 经 CLAUDE.md 读取）
   ↓
PROJECT_LOCAL_OVERRIDES.md
   ↓
总索引 info-summary/信息汇总-Summary-索引.html
   ↓
当前 task 的信息汇总 + 相关对象的规则信息汇总
   ↓
Source / Tests / Runtime / Topic evidence
```

`WEBCHAT_AGENTS.md` 只管网页 Chat 的 Generic 问题，网页 Chat 操作 repo 时按那个 repo 的 `AGENTS.md`；Project-specific constraint 仍来自 AGENTS 的 `PROJECT_LOCAL_OVERRIDES.md` extension，不在 WEBCHAT 文件尾部追加第二份 override。

Root 不再把 `INDEX.md / index.md / README.md / USER_PREFERENCES.md / LATEST_STATE.md / ZERO_CONTEXT_AI_REFERENCE.md / ZERO_CONTEXT_AI_HANDOFF.md / ZERO_CONTEXT_AI_HANDOFF_TASK_INDEX.md / FEATURE_MAP.md / KNOWLEDGE_MAP.md` 作为入口状态文件；清理时按下面 `旧文件过渡` 和 `prompts/common-prompts/rules/MARKDOWN_DOCUMENT_RULES.md` 的 `重构不丢内容` 处理。

当前 Human 明确 exception repositories：

- `my-demo-tf-module`
- `my-demo-reusable-actions-for-tf-module`
- `white-cat-farm`
- `meal-buddy`
- `my-sandbox-wlx-azure-policy`

Exception repository 不要求建立完整 Coding Repo task-control structure，除非 Human 以后明确取消 exception；但适用的 Common rules / safety boundary 仍必须遵守。Repository 也可以在自己的 `PROJECT_LOCAL_OVERRIDES.md` 声明为 exception；上面 5 个 repo 都在自己的 overrides 写好声明后，再从本文件删除这份名单。

### 旧文件过渡

- **还有旧文件时**：Repository 里还有 `ZERO_CONTEXT_AI_HANDOFF.md`、`FEATURE_MAP.md`，或上面 `Human 会读的都写成信息汇总` 表左列的旧 `.md` 时，先读它们，再在这个 repo 下一次实际工作时（或 Common 同步那一轮）迁移。
- **迁移去向**：照上面那张表：任务进总索引；当前步骤、blocker 和下一步进对应任务的信息汇总；定下的决定进规则信息汇总；账号、Cloudflare 资源和部署目标进账号和服务信息汇总；只有历史价值的内容原文归档到 `history/YYYY-MM-DD-...`。
- **已合并的小任务**：旧任务索引里只链接一个已合并 PR 的 ✅ 行不搬进总索引（GitHub 的已合并 PR 就是记录）；整份旧任务索引原文归档到 `history/`，所以一句话说明不会丢。
- **删除条件**：确认原文每条有效内容都有去处后，才删除旧文件；同一轮把指向旧文件的链接改到新页面。

### State files before / after every bounded task

- **开始 task 前**：读取最新总索引和相关信息汇总，确认当前 task 和优先级。
- **过程中和完成后**：出现新事实、决定、validation、blocker 或 Next 变化时更新对应信息汇总；task 完成、暂停或取消时更新总索引那一行；Personal Project 的信息汇总 HTML 单独 commit、直接 push `main`，不走 PR（见 `AGENTS.md` 的 `信息汇总直接 push`）。
- **避免机械修改**：检查所有 state files ≠ 机械修改所有文件；没有变化的不制造无意义 commit。
- **不手写 git 已有信息**：main SHA、PR 开没开 / 合没合、branch 状态用 `git log` / `gh pr list` 实时查；需要指向时只放 PR 链接。
- **Task collaboration report**：当 AI 正在按总索引 / 信息汇总推进 tracked bounded task 时，进度/完成报告固定说明 `当前任务`、`目的：...`、`最简单例子`、`下一步`。
- **两列表达**：上述 task 信息默认用两列 `事情 / 对象 | 说白了` 表达；不要因为需要 Purpose / Example 就恢复普通回答的 4-column Table。

### 总索引 = 任务 + 信息汇总

- **一行一个**：每个还没做完的任务一行，每页信息汇总一行；有信息汇总的任务只占一行（链接到它的信息汇总），不再为页面另写一行。
- **一行写什么**：状态小圆点、标题链接（信息汇总，小任务链接 PR）、一句话说明；一句话说明不写步骤。
- **状态小圆点**：用 `HTML_PAGE_RULES.md` 的状态色：蓝点 `todo` 正在做、空心圈 `wait` 暂停 / 等待、紫点 `team` 等团队、绿点 `ok` 完成、红点 `risk` 要先处理；同一时间通常只有一个蓝点。取消的任务：有信息汇总的用空心圈并在说明写“取消”，只有 PR 的直接删掉那一行。
- **小任务做完就删行**：只链接 PR 的小任务，PR 合并后删掉那一行；有信息汇总的任务做完后保留那一行，改成绿点。
- **只写 high level**：具体步骤、下一步、evidence 只写在信息汇总。
- **状态以总索引为准**：任务的状态以总索引为准；已完成的旧 HLF 里面的步骤状态不回头改。
- **怎么排**：按 `INFO_SUMMARY_HTML_RULES.md` 的 `分层：总索引 → Ticket → Subtask，最多三层` 排，不按状态拆开。

### Feature / Task / 信息汇总一一对应与粒度

默认关系：

```text
1 Feature
   =
1 bounded Task
   =
1 总索引行（+ 1 信息汇总，跨多个 Chat / PR 时）
```

这里的 Feature / Task 指一个 Human 真正想完成、可以独立判断 Done / Not Done 的 outcome。

AI 必须主动判断粒度：

- **默认一一对应**：一个 Feature = 一个 bounded Task = 一个总索引行；需要信息汇总时只建一个，不要为同一 outcome 建多份。
- **小任务不建信息汇总**：一个 PR 就能做完的 task，PR 描述就是记录；要跨多个 Chat 或多个 PR 的 task 才建信息汇总。
- **不要拆太细**：多个要求服务同一 outcome、共享主要实现边界与 acceptance、适合一起实现验证时合并。
- **不要合太大**：如果包含多个可独立完成 outcome，或对象、owner、blocker、acceptance、release/risk 不同，必须拆分。
- **以 outcome 为边界**：不按文件数量、技术层、Agent 数量机械切。
- **一次能闭环**：bounded Task 应能在一个连贯 cycle 内完成 implementation、proportional validation 和 state update。
- **拆分必须仍有用户可理解 outcome**：不能机械创建“只改 DB / 只改 backend”这种没有独立结果的伪 Feature，除非它本身就是明确工程目标。

### HLF 停用（2026-11-02 起）

- **为什么**：Markdown 的 HLF 文字密度太大，Human 看不过来；任务的状态、下一步和 evidence 改由信息汇总 HTML 承载，Human 和 AI 只维护一份。
- **不再新建、不再更新**：AI 不新建 HLF，也不往已有 HLF 里写新内容。
- **HLF 只读**：需要以前的 context 时可以读 HLF，只读不写；要写的东西都写进信息汇总 HTML。
- **恢复老任务先迁移**：总索引那一行还链接着 HLF 时，开工前先把 HLF 里仍然有用的内容（当前步骤、下一步、决定、blocker、evidence、关键 repo / code 路径）搬进这个任务的信息汇总，再把那一行改成链接信息汇总；按 `MARKDOWN_DOCUMENT_RULES.md` 的 `重构不丢内容` 核对没丢东西。
- **旧说法不照做**：旧版 `AGENTS.md`、旧 prompt（例如 `prompt-high-level-flow-index.md`）、README、模板里还叫 AI 新建或更新 HLF 的地方，一律不照做，以 `AGENTS.md` 为准；HLF 文件再多，也不是新任务的样板。这些旧文件不用为此去改。
- **没有总索引就先建**：repo 还没有 `info-summary/信息汇总-Summary-索引.html` 时，rules sync 那一轮就建（见 `COMMON_RULES_SYNC.md` 的 `Control-file drift check`），旧 HLF 任务里没做完的各一行，做完的用一行指向 `high-level-flow-index/`，不逐个搬。
- **HLF 留作历史**：迁移后的 HLF 和已完成任务的 HLF 都原样留在 `high-level-flow-index/`，不删、不改。
- **执行细节写哪**：当前步骤和下一步写在信息汇总的状态块；做过的事写进时间线；路径、SQL、命令输出等细节放进点开才看到的详情（规则见 `INFO_SUMMARY_HTML_RULES.md`）。
- **决定的去处**：做完后仍然有效的决定，同时写进这个对象的规则信息汇总。

### 规则信息汇总 = 已定下的规则

- **一个对象一页**：文件名 `info-summary/YYYY-MM-DD-<对象>-规则-信息汇总-Summary.html`，例如 `2026-10-18-ZERO-SPEND-规则-信息汇总-Summary.html`；在总索引里一行。
- **5 块怎么放**：① 结论写现在的最终规则；② 主图画这条规则管哪些东西、怎么判断；③ 状态写还有没有没落实或待确认的；④ 时间线一个决定一个点（日期、定了什么、来源信息汇总 / PR）；⑤ Q&A 放 Human 会问的问题。
- **规则改了就改这一页**：改结论和主图，在时间线加一个点；不另建新页。
- **只在有决定时建**：没有需要长期保留的决定，就不建。
- **和其他文件的区别**：`PROJECT_LOCAL_OVERRIDES.md` 写 AI 在这个 repo 的工作方式有什么不同；规则信息汇总写产品 / 功能 / 对象定下来的规则；任务信息汇总写一件事做到哪了，只用一句话链接规则页，不再写一份规则。
- **Common repo**：Common 的规则就在 `prompts/common-prompts/rules/` 等 shared files 里，不另建规则信息汇总。
