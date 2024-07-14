import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../Supabase/Supabase';
import gcash from '../assets/GCash.png'
import useBuyItem from './BuyitemHook';
import useBookDetailsHook from './BookDetailsHook';


export default function EBookDetails() {

    const location = useLocation();
    const [passDets, setPassDets] = useState(location.state.book);
    const [user, setUser] = useState(location.state.user);
    console.log(location.state)
    console.log(passDets);
    const navigate = useNavigate();

    console.log("passdets",passDets);
    
    const { 
        BuyItemTrigger,
        setReferenceNo,
        setFirstname,
        setLastName,
        setIsChecked,
        setContactNo,
        AddtoFavourites,
        DeleteFavourites,
        BuyEbookTrigger 
    } = useBuyItem(user);

    const {
        QuantityAdd,
        QuantityMinus,
        paymentTrigger,
        returnBackDisplay,
        Payment,
        quantity,
        totalPrice,
        triggerMessage,
        setQuantity,
        setTotalPrice,
        setTriggerMessage,
        messageRef,
        setMessageContent,
        SendMessageFunc,
        favourites,
        setFavourites,
        favouriteLoad
    } = useBookDetailsHook(passDets, setIsChecked, user);

    useEffect(() => {
        const subscription = supabase
            .channel('books')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'books'
            }, (payload) => {
                console.log(payload);
                setPassDets(payload.new);
            })
            .subscribe();

        const subscription1 = supabase
            .channel('favourites')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'favourites'
            }, (payload) => {
                console.log(payload);
                if(payload.eventType === 'DELETE'){
                    setFavourites(false);
                }else{
                    setFavourites(true);
                }
                
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
            subscription1.unsubscribe();
        };

    }, [setFavourites, setPassDets]);

    return (
        <>
        <div className="BookDetailsContainer" style={{marginTop: "100px"}}>
            <hr style={{ margin: '0px 10%' }} />
            <div className="Book-Details">
                {location.state.link !== null ? (
                    <span className="Back-Button" onClick={() =>
                        {navigate(`/userProfile/${passDets.account_name}?Profile`, 
                            {state: {passDets: location.state.book}})}}
                    >Back</span>
                ) : (
                    <span className="Back-Button" onClick={() => navigate('/books')}>Back</span>
                )}
                <div className="left-details">
                    <div className="book-title">
                        <h2>{passDets.book_title}
                        {favouriteLoad ? (
                            null
                        ): (
                            favourites ? (
                                // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                //     <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.18.18 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.18.18 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.18.18 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.18.18 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.18.18 0 0 0 .134-.098z"/>
                                //     <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                // </svg>
                                <button onClick={() => DeleteFavourites(passDets.id)}>Cancel Favourite</button>
                            ):(
                                // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-star" viewBox="0 0 16 16">
                                //     <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.18.18 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.18.18 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.18.18 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.18.18 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.18.18 0 0 0 .134-.098z"/>
                                //     <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                // </svg>
                                <button onClick={() => AddtoFavourites(passDets.id)}>Add to favourite</button>
                            )
                        )}
                        </h2>
                        <div style={{color: "grey"}}>Posted By: 
                        <span onClick={() =>{navigate(`/userProfile/${passDets.account_name}?Profile`, {state: {passDets}})}}>{passDets.account_name}</span>
                        <svg onClick={() => setTriggerMessage(!triggerMessage)} 
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots-fill bi-message-icon" viewBox="0 0 16 16">
                            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                        </svg>
                        {triggerMessage && (
                            <span className="send-a-message-details" ref={messageRef}>
                                <div style={{display: "flex"}}>
                                    <input type="text" 
                                        placeholder='Send A Message...' 
                                        onChange={(e) => setMessageContent(e.target.value)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SendMessageFunc(passDets.account_name)}
                                        width="16" height="16" fill="currentColor" className="bi bi-send-fill bi-message-icon" viewBox="0 0 16 16">
                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                    </svg>
                                </div>
                            </span>
                        )}
                        </div>
                        <p>Location: <a href={passDets.location_tag} target="_blank">{passDets.location}</a></p>
                    </div>
                    <div className="left-img">
                        <img src={passDets.imagetag} alt="Book" />
                    </div>
                    <div className="book-description">
                        <p>Author: {passDets.author}.</p>
                        <p>Sypnosis:</p>
                        <p>{passDets.description}</p>
                    </div>
                </div>
                <div className="right-details">
                    <div className="right-container">
                        <div className="price-details">

                            <span>Item #{passDets.id}
                                {passDets.in_process !== 0 && (
                                    <span className="item-process">In Process: {passDets.in_process}</span>
                                )}
                            </span>

                            <h2 className='priceh2'>₱{totalPrice}.00</h2>
                            <div className="Qty">
                                <button className="Buy Buy-hover" onClick={() => paymentTrigger()}>Buy E-Book</button>
                            </div>
                        </div>
                        <hr style={{ marginTop: '25px' }} />
                        <div className="payment-details">
                            <p>You can pay through: </p>
                            <img 
                                src="https://www.nationalbookstore.com/upload/e147be8359a1397fac06bdc10795d48b/7f0a967992d03dc98fc6e933bba31495.jpg" 
                                alt="Payment Method 1"
                                style={{marginLeft: "20px"}} 
                            />
                        </div>
                        <hr style={{ marginTop: '15px' }} />
                        <div className="notice-details">
                            <p>NOTICE: </p>
                            <p style={{ marginTop: '15px' }}>This website cannot guarantee the safety of your funds.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {Payment && 
        <>
            <div className="Buy-Display1" onClick={() => returnBackDisplay()}></div>
            <div className="Buy-Display" style={{height: '630px', top: '33.4%'}}>
                
                <div className="gcash-content">
                    <h3 style={{marginTop: "25px"}}>SELLER GCASH DETAILS</h3>
                    <div>
                        <img src={gcash} alt="" style={{maxWidth: "50%", maxHeight: "50%", objectFit: "cover"}}/>
                    </div>
                    <p id="phonenumber">099-5281-3643</p>
                    <div className="amount-paying">
                        <p className="paying-amount">Amount: ₱{totalPrice}.00</p>
                    </div>


                    <div className="gcash-text">
                        <input type="text" 
                                placeholder="Input Reference Number" 
                                onChange={(e) => setReferenceNo(e.target.value)}
                        />
                        <div className="gcash-text2">
                            <input type="text" 
                                    style={{marginRight: "5px"}} 
                                    placeholder="First Name"
                                    onChange={(e) => setFirstname(e.target.value)}        
                            />
                            <input type="text" 
                                    style={{marginRight: "5px"}} 
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                            <input type="text" 
                                    placeholder="Contact Number"
                                    onChange={(e) => setContactNo(e.target.value)}
                            />
                        <div>
                            <button id="BuyItem1" 
                                onClick={() => { 
                                    BuyEbookTrigger(
                                        passDets.id,
                                        passDets.account_name,
                                        totalPrice
                                    ), 
                                    setTotalPrice(passDets.book_price),
                                    setQuantity(1)
                                }}>
                                Done
                            </button> {/**onclick="buyitem() */}
                        </div>
                    </div>
                </div>
            </div>
            </>
            }

        </>
    );
}