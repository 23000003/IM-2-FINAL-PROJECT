import '../styles/Admin.css'
import AdminPostApproval from './AdminPostApproval';
import AdminViewAccount from './AdminViewAccounts';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel(){

    const navigate = useNavigate();

    return(
        <div className="admin-container">
            <div className="admin-background">
                <div className="Welcome">
                    <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z" alt=""/>
                    <h2>Hello Admin 1</h2>
                </div>
                <div className="Data">
                    
                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className0="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Data-Card">
                        <div style={{margin: '2em', width: '100%'}}>
                            <div className="Data-Card-Child1">                        
                                <h2 style={{fontSize: '22px'}}>Number of Books On Sale</h2>
                            </div>
                            <div className="Data-Card-Child2">
                                <h2>100</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-view">
                    <div className="view-container">
                        <div className="tab-labels">
                            <h2 onClick={() => navigate('/Admin/ViewAccounts')}>Accounts</h2>
                            <hr />
                            <h2 onClick={() => navigate('/Admin/PostApproval')}>Post Approval</h2> {/*make a nested route*/}
                        </div>
                        <AdminPostApproval/>
                            {/* <AdminViewAccount/> */}
                    </div>
                    <div style={{ marginTop: '10%' }}></div>
                </div>
            </div>
        </div>
    );
}