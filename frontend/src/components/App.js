import React, {useEffect, useState} from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import myApi from "../utils/api";
import avatar from '../images/cousteau.jpg';
import CurrentUserContext from "../context/CurrentUserContext";
import CardsContext from "../context/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth.js';
import { getToken } from '../utils/token';
import InfoTooltip from './InfoTooltip.js';

export default function App() {
  const [popupsState, popupsSetState] = useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isRemoveCardPopupOpen: false,
    isInfoTooltipOpen: false
  })
  const [selectedCard, setSelectedCard] = useState('')
  const [currentUser, setCurrentUser] = useState({
    name: 'Жак-Ив Кусто',
    description: 'Исследователь океана',
    avatar: avatar,
    _id: 0
  })
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({email: ''});
  const history = useHistory();
  const [registrationErrorStatus, setRegistrationErrorStatus] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    Promise.all([
      myApi.getUserData(),
      myApi.getCardsData()
    ])
      .then((res) => {
        const [profileData, cardsData] = res;
        setCurrentUser({
          name: profileData.name,
          description: profileData.about,
          avatar: profileData.avatar,
          _id: profileData._id
        });
        setCards(cardsData);
      })
      .catch((error) => {
        console.log('Я получал данные о профиле и карточках. Я сломался. Ошибка: ' + error)
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    myApi.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => {
        console.log('Я работал с лайком. Я сломался. Ошибка: ' + error)
      });
  }

  function handleCardDelete(card) {
    myApi.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter(item => card._id !== item._id);
        setCards(newCards);
      })
      .catch((error) => {
        console.log('Я удалял карточку. Я сломался. Ошибка: ' + error)
      });
  }

  function handleUpdateUser(data) {
    myApi.setUserData(data)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          description: res.about,
          avatar: res.avatar,
          _id: res._id
        })
      })
      .then(() => {closeAllPopups()})
      .catch((error) => {
        console.log('Я менял данные пользователя. Я сломался. Ошибка: ' + error)
      });
  }

  function handleUpdateAvatar(data) {
    myApi.setNewAvatar(data)
      .then((res) => {
        setCurrentUser({
          name: currentUser.name,
          description: currentUser.description,
          avatar: res.avatar,
          _id: currentUser._id
        })
      })
      .then(() => {closeAllPopups()})
      .catch((error) => {
        console.log('Я отправлял новый аватар. Я сломался. Ошибка: ' + error)
      });
  }

  function handleAddPlaceSubmit(data) {
    myApi.setCardsData(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {closeAllPopups()})
      .catch((error) => {
        console.log('Я добавлял новую карточку. Я сломался. Ошибка: ' + error)
      });
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    popupsSetState({...popupsState, isEditProfilePopupOpen: !popupsState.isEditProfilePopupOpen})
  }
  function handleAddPlaceClick() {
    popupsSetState({...popupsState, isAddPlacePopupOpen: !popupsState.isAddPlacePopupOpen})
  }
  function handleEditAvatarClick() {
    popupsSetState({...popupsState, isEditAvatarPopupOpen: !popupsState.isEditAvatarPopupOpen})
  }
  function handleRemoveCardClickPopupOpen() {
    popupsSetState({...popupsState, isRemoveCardPopupOpen: !popupsState.isRemoveCardPopupOpen})
  }
  function handleInfoTooltipOpen() {
    popupsSetState({...popupsState, isInfoTooltipOpen: !popupsState.isInfoTooltipOpen})
  }
  function closeAllPopups() {
    popupsSetState({
      ...popupsState, isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isRemoveCardPopupOpen: false,
      isInfoTooltipOpen: false
    });
    setSelectedCard('')
  }

  function handleExit() {
    setLoggedIn({loggedIn: !loggedIn});
  }

  function handleLogin(userData) {
    setUserData(userData);
    setLoggedIn(true);
  }

  function tokenCheck () {
    const jwt = getToken();

    if (!jwt) {
      return;
    };

    if (jwt) {
      return auth.getContent(jwt)
              .then((res) => {
                setLoggedIn(true);
                setUserData({email: res.data.email});
                history.push('/');
              });
    }
  }

  function apiRegister(password, email) {
    auth.register(password, email)
      .then((data) => {
        if (data.error) {
          setRegistrationErrorStatus(true);
          handleInfoTooltipOpen();
        }
        if (!data){
          setRegistrationErrorStatus(true);
          handleInfoTooltipOpen();
        }
        if (data.data._id) {
          history.push('/sign-in');
          setRegistrationErrorStatus(false);
          handleInfoTooltipOpen();
        }
      })
      .catch(err => console.log(err))
  }

  function apiLoginCheck (email, password, userData) {
    auth.authorize(email, password)
      .then((data) => {
        if (!data){
          setRegistrationErrorStatus(true);
          handleInfoTooltipOpen();
          tokenCheck();
        } else {
          handleLogin(userData);
          setRegistrationErrorStatus(false);
          history.push('/');
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='App'>
      <div className='page'>
        <div className='page__container'>

          <CurrentUserContext.Provider value={currentUser}>
            <CardsContext.Provider value={cards}>
              <Header user={userData} onExit={handleExit}/>
                <Switch>

                  <ProtectedRoute exact path='/'
                    loggedIn={loggedIn}
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onRemoveClickPopup={handleRemoveCardClickPopupOpen}
                    onLikeClick={handleCardLike}
                    onDeleteClick={handleCardDelete}
                  />

                  <Route path='/sign-up'>
                    <Register
                      registerFetchOnSubmit={apiRegister}
                    />
                  </Route>
                  
                  <Route path='/sign-in'>
                    <Login
                      handleLogin={apiLoginCheck}
                    />
                  </Route>

                  <Route>
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                  </Route>

                </Switch>

              <Footer isOpen={loggedIn}/>

              <EditProfilePopup
                  isOpen={popupsState.isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                  isOpen={popupsState.isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
              />
              <AddPlacePopup
                  isOpen={popupsState.isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  handleNewPlace={handleAddPlaceSubmit}
              />
              <PopupWithForm
                  name={'submit'}
                  title={'Вы уверены?'}
                  isOpen={popupsState.isRemoveCardPopupOpen}
                  onClose={closeAllPopups}
              />
              <ImagePopup
                  card={selectedCard}
                  name={'image'}
                  onClose={closeAllPopups}
                >
              </ImagePopup>
              <InfoTooltip
                isOpen={popupsState.isInfoTooltipOpen} 
                onClose={closeAllPopups} 
                isError={registrationErrorStatus}
              />
              
            </CardsContext.Provider>
          </CurrentUserContext.Provider>

        </div>
      </div>
    </div>
  );

}

