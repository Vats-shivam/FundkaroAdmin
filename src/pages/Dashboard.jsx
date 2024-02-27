import NameNavbar from '../components/NameNavbar';
import SideDashboard from '../components/SideDashboard';

function Dashboard({children}) {
  return (
    <div className='h-screen w-screen'>
      <NameNavbar/>
      <SideDashboard/>
      <div className='ml-72 mt-20 font-primaryFont'>
          {children}
    </div>
  </div>
  );
}

export default Dashboard;
