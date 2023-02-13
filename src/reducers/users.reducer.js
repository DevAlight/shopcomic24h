import {
    FETCH_SUCCESS_API, FETCH_ERROR_API, FETCH_PENDING_API, MODAL_LOGIN, USER_LOGIN, PAGINATION_CHANGE
    , LOAD_BREADCRUMB, FILTER_COMIC, DETAIL_PRODUCT, ADD_PRODUCT_TO_CART, PAGINATION_CHANGE_FILTER, GETTING_ORDER, OPEN_ORDER_MODAL
} from "../constants/users.constants";
const item = JSON.parse(localStorage.getItem("item")) || [];
const userData = JSON.parse(localStorage.getItem("user")) || null;
const userVerifyData = JSON.parse(localStorage.getItem("userVerify")) || null;

const initialState = {
    pending: true,
    isFiter: false,
    dataFiter: [],
    data: [], //tạo biến để chứa data mới được tạo
    bread: [{ name: 'Home', url: '/' }],
    dataFiterFull: 0,
    dataFull: 0,
    detailProduct: null,
    cartBag: item,
    quantity: 1,
    openModal: false,
    user: userData,
    userVerify: userVerifyData,
    currentPage: 1,
    currentPageFiter: 1,
    searchData: null,
    orderID: null  
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PENDING_API:
            state.pending = true;
            break;
        case FETCH_ERROR_API:
            state.pending = true;
            break;
        case LOAD_BREADCRUMB:
            state.bread = action.break;
            break;
        case FETCH_SUCCESS_API:
            state.data = action.data;
            state.dataFull = action.dataFull
            state.pending = false;
            break;
        case FILTER_COMIC:
            state.dataFiter = action.dataFiter;
            state.dataFiterFull = action.dataFiterFull;
            state.pending = false;
            state.isFiter = true;
            state.searchData = action.searchData
            break;
        case DETAIL_PRODUCT:
            state.detailProduct = action.detail;
            break;
        case ADD_PRODUCT_TO_CART:
            state.cartBag = action.payload;
            break;
        case MODAL_LOGIN:
            state.openModal = action.status;
            break;
        case USER_LOGIN:
            state.userVerify = action.userVerify;
            state.user = action.user;
            localStorage.setItem('userVerify', JSON.stringify(state.userVerify));
            break;
        case PAGINATION_CHANGE:
            state.currentPage = action.page;
            break;
        case PAGINATION_CHANGE_FILTER:
            state.currentPageFiter = action.page;
            break;
        case GETTING_ORDER:
            state.orderID = action.orderID;
            break;

        case OPEN_ORDER_MODAL:
            state.orderID = action.orderID;
            state.cartBag = []
            localStorage.removeItem('item', JSON.stringify(null));
            break;
        default:

    }

    return { ...state }
}