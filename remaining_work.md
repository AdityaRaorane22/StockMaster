# StockMaster - Remaining Implementation Items

Based on the analysis of the codebase and PRD, here are the features that still need to be implemented, prioritized by importance.

## 1. Dashboard Operational KPIs (Must Have)
**Goal**: Provide immediate visibility into daily operations.
- **Backend**: Update `/api/dashboard/stats` to calculate:
    - `Late`: Operations where Schedule Date < Today.
    - `Upcoming`: Operations where Schedule Date >= Today.
    - `Waiting`: Operations with "Waiting" status.
    - `Total Products`: Count of all products.
- **Frontend**: Update `Dashboard.js` to replace generic "Pending" cards with these specific counters.

## 2. Stock Valuation & Visibility (Must Have)
**Goal**: Accurate financial tracking.
- **Frontend**: Update `StockList.js` to add a "Stock Valuation" column (`Quantity * Unit Cost`).
- **Frontend**: Display "Total Products" count.

## 3. Security Validations (Must Have)
**Goal**: Basic security hygiene.
- **Backend**: Update `User` model to enforce strict password regex (1 Upper, 1 Lower, 1 Special, >7 chars).
- **Frontend**: Add real-time validation to `Signup` page.

## 4. UX & Efficiency (Good to Have)
**Goal**: Improved user experience.
- **Kanban View**: Add List/Kanban toggle for Receipts and Deliveries.
- **Direct Stock Update**: Add "Quick Edit" button in `StockList`.
- **Move History Grouping**: Group `MoveHistory` rows by Reference ID.
- **Password Reset**: Implement OTP-based password reset (Backend & Frontend).
