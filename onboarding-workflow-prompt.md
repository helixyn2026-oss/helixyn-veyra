# Prompt for Antigravity: replace employee onboarding workflow

Replace the existing new-employee onboarding workflow in this application with the workflow below. Remove the old flow entirely rather than leaving it alongside the new one.

## Context

This is an internal tool for a small startup. The current workflow sends login credentials to a new employee before CEO approval is granted, and hands GitHub project access from tech lead to employee manually with no record kept. Both are being replaced.

## Required workflow, in exact order

1. **Offer letter draft.** HR opens a form pre-filled with a single fixed boilerplate offer letter template. HR enters: employee name, role, salary band, joining date. HR submits. At this point nothing is emailed and no database record beyond a draft entry exists.

2. **Approval gate.** The draft goes to a user holding the configurable role `approver` (do not hardcode this to a specific named user, store it as a role lookup so the approver can change without a code change). The approver sees approve or reject only, no ability to edit the letter content. Store the result as an explicit status field: `pending`, `approved`, `rejected`.

3. **Offer letter sent on approval only.** If and only if status is `approved`, the system automatically generates the offer letter PDF from the template and emails it to the candidate's email address. If rejected, the workflow ends here and no further steps run.

4. **Candidate acceptance.** The offer email contains a unique acceptance link. When the candidate clicks it, this is the trigger that creates the actual employee record in the database. Before this click, no employee record exists beyond the draft from step 1.

5. **Credential issue.** Only after acceptance, generate login credentials and send them in a separate email from the offer letter. Force a password reset on first login rather than allowing the system-generated password to remain valid indefinitely.

6. **TL notification.** On employee record creation, automatically notify the relevant tech lead (in-app notification plus email) that a new employee has joined and needs project assignment. Do not rely on the TL checking manually.

7. **Project assignment.** TL assigns the employee to a project inside the tool by selecting from existing projects, not by typing free text.

8. **GitHub provisioning.** On project assignment, the system calls the GitHub API directly to add the employee to the corresponding GitHub repository or team with the correct role. Do not allow manual sharing of GitHub invite links or project IDs outside the tool.

9. **Audit log.** Every state transition in this entire flow (drafted, approved, rejected, accepted, credentials issued, project assigned, GitHub access granted) must be logged with a timestamp and the acting user. This log should be viewable by admins.

## Explicit constraints, do not deviate from these

- Do not send any credentials before candidate acceptance, under any circumstance
- Do not send the offer letter before approval, under any circumstance
- Do not hardcode the approver to a specific user, use a role lookup
- Do not build a multi-tier approval chain, single approver role only
- Do not build a free-text offer letter editor, the template is fixed
- Do not build a mobile app, web only
- Do not allow manual GitHub link sharing as an alternative path, provisioning must go through the API call in step 8

## Deliverable

Implement this as a replacement for the existing onboarding workflow, removing the old credential-before-approval logic and the manual GitHub handoff step entirely. Confirm which existing files or modules implement the current flow before making changes, and list them before starting so the replacement scope is clear.
