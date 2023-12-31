// import logo from './logo.svg';
import FoodSearch from './project/FoodSearch';
// recoil 사용하기 위해서는 recoilroot로 전체 컴포넌트를 감싸야 함
import './App.css';
import RecoilStateProvider from './project/RecoilStateProvider';

function App() {
  return (
    <RecoilStateProvider>
      <FoodSearch />
    </RecoilStateProvider>
  );
}

export default App;
