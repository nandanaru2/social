import React, { useState } from "react";
import { Table, Column, HeaderCell, Cell, Nav, Button } from "rsuite";

// Sample data for tables
const data1 = [{ id: "DRA-1125" }, { id: "DRA-1126" }];
const data2 = [{ id: "DRA-2125" }, { id: "DRA-2126" }];
const data3 = [{ id: "DRA-3125" }, { id: "DRA-3126" }];

function App() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [dynamicTabs, setDynamicTabs] = useState([]); // To manage dynamic tabs

  // Add a new dynamic tab
  const addDynamicTab = (id) => {
    if (dynamicTabs.length < 2 && !dynamicTabs.some((tab) => tab.id === id)) {
      setDynamicTabs([...dynamicTabs, { id }]);
      setActiveTab(id); // Switch to the new tab
    }
  };

  // Remove a dynamic tab
  const closeDynamicTab = (id) => {
    setDynamicTabs(dynamicTabs.filter((tab) => tab.id !== id));
    setActiveTab("tab1"); // Switch back to the default tab
  };

  // Table component to render IDs and handle clicks
  const CustomTable = ({ data }) => (
    <Table height={200} data={data} bordered>
      <Column width={200} align="center" fixed>
        <HeaderCell>ID</HeaderCell>
        <Cell>
          {(rowData) => (
            <Button
              appearance="link"
              onClick={() => addDynamicTab(rowData.id)}
            >
              {rowData.id}
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );

  return (
    <div>
      {/* Tab Navigation */}
      <Nav activeKey={activeTab} onSelect={setActiveTab} appearance="tabs">
        <Nav.Item eventKey="tab1">Table 1</Nav.Item>
        <Nav.Item eventKey="tab2">Table 2</Nav.Item>
        <Nav.Item eventKey="tab3">Table 3</Nav.Item>
        {dynamicTabs.map((tab) => (
          <Nav.Item eventKey={tab.id} key={tab.id}>
            {tab.id}{" "}
            <Button
              size="xs"
              appearance="subtle"
              onClick={() => closeDynamicTab(tab.id)}
            >
              ✕
            </Button>
          </Nav.Item>
        ))}
      </Nav>

      {/* Tab Content */}
      {activeTab === "tab1" && <CustomTable data={data1} />}
      {activeTab === "tab2" && <CustomTable data={data2} />}
      {activeTab === "tab3" && <CustomTable data={data3} />}
      {dynamicTabs.map(
        (tab) =>
          activeTab === tab.id && (
            <div key={tab.id}>
              <h4>Details for {tab.id}</h4>
              <p>Display detailed information here...</p>
            </div>
          )
      )}
    </div>
  );
}

export default App
