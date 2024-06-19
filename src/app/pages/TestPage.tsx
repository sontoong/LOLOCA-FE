import { Link } from 'react-router-dom';

const TestPage = () => {
  return (
    <div>
      <Link to={'/tours/1/booking'}>Tour</Link>
      <Link to={'/guides/1/booking'} style={{ marginLeft: '10px' }}>Guide</Link>
    </div>
  );
};

export default TestPage;