import { Card, Col, Form, Row } from 'react-bootstrap'

function SearchFilterSort({
  searchText,
  setSearchText,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
}) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Search / Filter / Sort</Card.Title>

        <Row className="g-3">
          <Col xs={12}>
            <Form.Control
              type="text"
              placeholder="Search tasks by title..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>

          <Col md={4} sm={12}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Homework">Homework</option>
              <option value="Meeting">Meeting</option>
              <option value="Health">Health</option>
              <option value="Personal">Personal</option>
            </Form.Select>
          </Col>

          <Col md={4} sm={12}>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </Form.Select>
          </Col>

          <Col md={4} sm={12}>
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="Default">Default Order</option>
              <option value="DueDate">Sort by Due Date</option>
              <option value="Priority">Sort by Priority</option>
              <option value="TitleAZ">Sort by Title (A-Z)</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default SearchFilterSort