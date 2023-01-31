import {
  FETCH_PENDING_API,
  FETCH_SUCCESS_API,
  FETCH_ERROR_API,
  PAGINATION_CHANGE_FILTER,
  LOAD_BREADCRUMB,
  FILTER_COMIC,
  DETAIL_PRODUCT,
  ADD_PRODUCT_TO_CART,
  MODAL_LOGIN,
  USER_LOGIN,
  PAGINATION_CHANGE,
  GETTING_ORDER,
  OPEN_ORDER_MODAL
} from "../constants/users.constants";

//call api get all for loading on table
export const fetchData = (limit, skip) => {
  return async (dispatch) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    await dispatch({
      type: FETCH_PENDING_API
    });
    try {
      setTimeout(async () => {
        const response = await fetch("http://localhost:8000/products?limit=" + limit + '&skip=' + ((skip - 1) * limit), requestOptions);
        const data = await response.json();
        const responseDataFull = await fetch("http://localhost:8000/products", requestOptions);
        const dataFull = await responseDataFull.json();
        return dispatch({
          type: FETCH_SUCCESS_API,
          data: data.data,
          dataFull: dataFull.data.length
        })
      }, 2000); // Delay 2 giây (2000 milliseconds)


    } catch (error) {
      return dispatch({
        type: FETCH_ERROR_API
      })
    }
  }
}
//fix breadcromb
export const changeBreadCromd = (array) => {
  return async (dispatch) => {
    return dispatch({
      type: LOAD_BREADCRUMB,
      break: array
    })
  }
}
//tiến hành filter và phân trang
export const filterClick = (searchData, limit, skip) => {

  return async (dispatch) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    await dispatch({
      type: FETCH_PENDING_API
    });
    try {
      setTimeout(async () => {
        const response = await fetch("http://localhost:8000/products-filter?limit=" + limit + '&skip=' + ((skip - 1) * limit)
          + "&type=" + searchData.type + "&name=" + searchData.name
          + " &minPrice=" + searchData.minPrice + "&maxPrice=" + searchData.maxPrice, requestOptions);
        const data = await response.json();
        const responseDataFull = await fetch("http://localhost:8000/products-filter?type="
          + searchData.type + "&name=" + searchData.name
          + " &minPrice=" + searchData.minPrice + "&maxPrice=" + searchData.maxPrice, requestOptions);
        const dataFull = await responseDataFull.json();
        console.log(dataFull);
        return dispatch({
          type: FILTER_COMIC,
          dataFiter: data.data,
          dataFiterFull: dataFull.data.length,
          searchData: searchData
        })
      }, 2000); // Delay 2 giây (2000 milliseconds)


    } catch (error) {
      return dispatch({
        type: FETCH_ERROR_API
      })
    }
  }
}
//hiển thị thông tin sản phẩm
export const detailProduc = (value) => {
  return async (dispatch) => {
    return dispatch({
      type: DETAIL_PRODUCT,
      detail: value
    })
  }
}
//add đồ vào giỏ
export const addProductToCartHandler = (data) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: data
  }
}
//hiện modal login
export const setModalLogin = (data) => {
  return {
    type: MODAL_LOGIN,
    status: data
  }
}
//lưu thông tin đăng nhập
export const saveUserLogin = (data) => {
  let localData = data;
  if (localData !== null) {
    return async (dispatch) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      await dispatch({
        type: FETCH_PENDING_API
      });
      try {
        setTimeout(async () => {
          const response = await fetch(`http://localhost:8000/customers?email=${localData.email}`, requestOptions);
          const data = await response.json();
          return dispatch({
            type: USER_LOGIN,
            user: localData,
            userVerify: data.data
          })
        }, 2000); // Delay 2 giây (2000 milliseconds)


      } catch (error) {
        return dispatch({
          type: FETCH_ERROR_API
        })
      }
    }
  }
  else {
    return {
      type: USER_LOGIN,
      user: null,
      userVerify: null
    }
  }

}
//thanh trang ở all page
export const changePagination = (page) => {
  return {
    type: PAGINATION_CHANGE,
    page: page
  }
}
//thanh trang ở bộ lọc
export const changePaginationFilter = (page) => {
  return {
    type: PAGINATION_CHANGE_FILTER,
    page: page
  }
}
//chạy order
export const gettingOrder = (id, orderData, orderDetail) => {
  return async (dispatch) => {
    try {
      // gọi API để tạo đơn hàng
      const orderResponse = await fetch(`http://localhost:8000/customers/${id}/orders`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: { 'Content-Type': 'application/json' },
      });
      const orderJson = await orderResponse.json();
      const orderId = orderJson.data._id;
      // gọi API để thêm chi tiết đơn hàng    
      const orderDetailResponse = await fetch(`http://localhost:8000/orders/${orderId}/orderDetails`, {
        method: 'POST',
        body: JSON.stringify({ products: orderDetail }),
        headers: { 'Content-Type': 'application/json' },
      });
      const orderDetailJson = await orderDetailResponse.json();            
      return dispatch({
        type: GETTING_ORDER,
        orderID: orderJson.data.orderCode
      })
    } catch (error) {
      console.error(error);
    }
  }
};
//Bật tắt modal order
export const modelOrder = (value) => {
  return {
    type: OPEN_ORDER_MODAL,
    orderID: value
  }
}

