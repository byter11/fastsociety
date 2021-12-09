import Layout from '../components/Layout';
import EventsView from '../components/Events/EventsView';
import AddEventBox from '../components/Events/AddEventBox';



const Index = props => {
	return <Layout>
		<AddEventBox/>
		<EventsView/>
	</Layout>
}	



export default Index;