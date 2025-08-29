📋 Backend: Mock GraphQL Server
Project Setup

[ ] Initialize a new Node.js project.

[ ] Install necessary dependencies for a mock GraphQL server (e.g., apollo-server, graphql).

[ ] Create a server file (e.g., server.js).

Schema & Resolvers

[ ] Define the 

Warehouse, Product, KPI, Query, and Mutation types using the provided schema.


[ ] Create mock data based on the sample provided.

[ ] Implement a resolver for the 

products query to handle search, status, and warehouse filters.



[ ] Implement a resolver for the 

warehouses query to return a list of unique warehouses from your mock data.


[ ] Implement a resolver for the 

kpis query to return mock KPI data over a date range.


[ ] Implement a resolver for the 

updateDemand mutation to update a product's demand in the mock data.



[ ] Implement a resolver for the 

transferStock mutation to adjust stock levels between warehouses in the mock data.


Server Execution

[ ] Start the GraphQL server on a specified port.

📋 Frontend: React Application
Project Setup & Configuration

[ ] Use Vite or Create React App to create a new React project.

[ ] Install and configure 

Tailwind CSS for styling.

[ ] Install a GraphQL client such as Apollo Client or urql.

[ ] Configure the GraphQL client to connect to your mock server.

Component Structure

[ ] Create a 

Dashboard component to act as the main container.

[ ] Develop a 

TopBar component with the "SupplySight" logo and date range chips.

[ ] Build a 

KpiCards container component to hold individual KpiCard components.

[ ] Create a 

Filters component for the search box, warehouse dropdown, and status dropdown.

[ ] Implement a 

ProductsTable component for displaying the product data.

[ ] Create a reusable 

ProductDrawer component for the side drawer.

[ ] Develop 

UpdateDemandForm and TransferStockForm components for the drawer.

Data Fetching & Logic

[ ] Write GraphQL queries to fetch products, warehouses, and KPIs.

[ ] Implement GraphQL mutations for updateDemand and transferStock.

[ ] Use GraphQL hooks (e.g., useQuery, useMutation) to connect components to the backend.

[ ] Implement logic to calculate 

Total Stock, Total Demand, and Fill Rate.

[ ] Add logic to determine a product's status (

Healthy, Low, or Critical) based on stock vs. demand.

[ ] Apply conditional styling to rows based on a "Critical" status.

[ ] Implement a search handler that filters the product data based on 

name, SKU, or ID.

[ ] Implement 

useState to manage the selected product for the side drawer.

Interactions & UX

[ ] Ensure filters update the dashboard live.

[ ] Implement pagination to display 10 rows per page.

[ ] Add a click handler to each table row to open the 

ProductDrawer.

[ ] Handle loading and error states for all data fetching and mutations.

[ ] Ensure the line chart correctly displays stock vs. demand trends based on 

kpis(range).

Final Deliverables

[ ] Create a 

GitHub repository for your project.

[ ] Write a 

NOTES.md file documenting your decisions, trade-offs, and potential improvements.

[ ] Ensure the code is clean, well-structured, and easy to read.

[ ] Review all business logic to ensure correctness.

[ ] Check for attention to detail in the overall UX.