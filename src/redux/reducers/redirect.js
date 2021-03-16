import * as actionTypes from '../actions/actionTypes';

const initState = {
  redirectTo: null,
  force: false,
};
function redirect(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { redirectTo: '/event/registration/' };

    case actionTypes.PAYMENT_SUCCESS:
      return { redirectTo: action.response }; // todo

    case actionTypes.CREATE_WORKSHOP_SUCCESS:
      return { redirectTo: `/edit_workshop/${action.response.id}` };

    case actionTypes.CREATE_ARTICLE_SUCCESS:
      return { redirectTo: `/edit_article/${action.response.id}` };

    case actionTypes.REDIRECT:
      return { redirectTo: action.payload };

    case actionTypes.INIT_REDIRECT:
      return initState;

    default:
      return state;
  }
}

export default redirect;
