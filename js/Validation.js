function GetELE(spanID) {
  return document.getElementById(spanID);
}
function ReturnMess(spanID, message) {
  GetELE(spanID).style.cssText = 'display:block';
  GetELE(spanID).innerHTML = message;
}
function ReturnNotMess(spanID) {
  GetELE(spanID).innerHTML = '';
}
function Validation() {
  this.checkEmpty = function (inputVal, spanID, message) {
    if (inputVal.trim() == '') {
      ReturnMess(spanID, message);
      return false;
    } else {
      ReturnNotMess(spanID);
      return true;
    }
  };
  this.checkTaiKhoanTrung = function (inputTK, spanID, message, arrNV) {
    var isExist = false;
    isExist = arrNV.some(function (item, index) {
      return item.taiKhoan === inputTK.trim();
    });
    if (isExist) {
      ReturnMess(spanID, message);
      return false;
    } else {
      ReturnNotMess(spanID);
      return true;
    }
  };
  this.checkTen = function (inputTen, spanID, message) {
    var pattern = new RegExp(
      '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
        'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
        'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$'
    );
    if (pattern.test(inputTen.trim())) {
      ReturnNotMess(spanID);
      return true;
    } else {
      ReturnMess(spanID, message);
      return false;
    }
  };
  this.checkEmail = function (inputEmail, spanID, message) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputEmail.trim().match(pattern)) {
      ReturnNotMess(spanID);
      return true;
    } else {
      ReturnMess(spanID, message);
      return false;
    }
  };
  this.checkPass = function (inputPass, spanID, message) {
    var pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    if (inputPass.trim().match(pattern)) {
      ReturnNotMess(spanID);
      return true;
    } else {
      ReturnMess(spanID, message);
      return false;
    }
  };
  this.checkDate = function (inputDate, spanID, message) {
    if (inputDate.length < 11) {
      var [date, month, year] = inputDate.split('/');
      date = parseInt(date);
      month = parseInt(month);
      year = parseInt(year);
      if (date > 0 && date < 32 && month > 0 && month < 13 && year >= 1800) {
        ReturnNotMess(spanID);
        return true;
      } else {
        ReturnMess(spanID, message);
        return false;
      }
    }
    ReturnMess(spanID, message);
    return false;
  };
  this.checkChucVuDropDown = function (selChucVu, spanID, message) {
    var optionSelect = GetELE(selChucVu).selectedIndex;
    if (optionSelect != 0) {
      ReturnNotMess(spanID);
      return true;
    } else {
      ReturnMess(spanID, message);
      return false;
    }
  };
  this.checkLuongCB = function (inputLuongCB, spanID, message) {
    var pattern = /^(2|1)?\d{7}$/;
    if (inputLuongCB.trim().match(pattern)) {
      var so = parseInt(inputLuongCB.trim());
      if (so >= 1000000 && so <= 20000000) {
        ReturnNotMess(spanID);
        return true;
      }
    }
    ReturnMess(spanID, message);
    return false;
  };
  this.checkGioLam = function (inputGioLam, spanID, message) {
    var pattern = /^(2|1)?\d{2}$/;
    if (inputGioLam.trim().match(pattern)) {
      var gioLam = parseInt(inputGioLam.trim());
      if (gioLam >= 80 && gioLam <= 200) {
        ReturnNotMess(spanID);
        return true;
      }
    }
    ReturnMess(spanID, message);
    return false;
  };
}
