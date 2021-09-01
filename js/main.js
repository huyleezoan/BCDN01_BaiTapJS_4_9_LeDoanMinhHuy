var dsnv = new DanhSachNhanVien();
var validation = new Validation();
var textDinhDang = ' không đúng định dạng!';
function GetElementID(id) {
  return document.getElementById(id);
}
function setLocalStorage() {
  localStorage.setItem('DanhSachNhanVien', JSON.stringify(dsnv.mangNV));
}
function getLocalStorage() {
  if (localStorage.getItem('DanhSachNhanVien') != null) {
    dsnv.mangNV = JSON.parse(localStorage.getItem('DanhSachNhanVien'));
    HienThiBang(dsnv.mangNV);
  }
}
getLocalStorage();
function HienThiBang(arrNV) {
  text = '';
  arrNV.map(function (item, index) {
    text += `<tr>
            <td>${item.taiKhoan}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${item.ngayLam}</td>
            <td>${item.chucVu}</td>
            <td>${item.tongLuong}</td>
            <td>${item.xepLoai}</td>
            <td>
              <button class="btn btn-danger" onclick="XoaNhanVien('${item.taiKhoan}')">Xóa</button>
            </td>
            <td>
              <button class="btn btn-warning" id="btnThem" data-toggle="modal" data-target="#myModal" onclick="XemThongTin('${item.taiKhoan}')">Xem</button>
            </td>
            
        </tr>`;
  });
  GetElementID('tableDanhSach').innerHTML = text;
}
function checkValEmpty(val, id) {
  return validation.checkEmpty(val, id, 'Bạn không được bỏ trống ô này!');
}
function checkValidation(
  taiKhoan,
  hoTen,
  email,
  password,
  date,
  luongCB,
  chucVu,
  gioLam
) {
  var isValid = true;
  isValid &= checkValEmpty(taiKhoan, 'tbTKNV');
  // chech tên nhân viên
  isValid &=
    checkValEmpty(hoTen, 'tbTen') &&
    validation.checkTen(hoTen, 'tbTen', 'Tên' + textDinhDang);
  // check email
  isValid &=
    checkValEmpty(email, 'tbEmail') &&
    validation.checkEmail(email, 'tbEmail', 'Email' + textDinhDang);
  // check mật khẩu
  isValid &=
    checkValEmpty(password, 'tbMatKhau') &&
    validation.checkPass(password, 'tbMatKhau', 'Mật khẩu' + textDinhDang);
  // check ngày
  isValid &=
    checkValEmpty(date, 'tbNgay') &&
    validation.checkDate(date, 'tbNgay', 'Ngày' + textDinhDang);
  // check lương cơ bản
  isValid &=
    checkValEmpty(luongCB, 'tbLuongCB') &&
    validation.checkLuongCB(
      luongCB,
      'tbLuongCB',
      'Lương cơ bản' + textDinhDang
    );
  // check chức vụ
  isValid &= validation.checkChucVuDropDown(
    'chucvu',
    'tbChucVu',
    'Chưa chọn chức vụ!'
  );
  // check giờ làm
  isValid &=
    checkValEmpty(gioLam, 'tbGiolam') &&
    validation.checkGioLam(gioLam, 'tbGiolam', 'Giờ làm' + textDinhDang);
  return isValid;
}
function KetQuaKhiIsValid(
  taiKhoan,
  hoTen,
  email,
  password,
  date,
  luongCB,
  chucVu,
  gioLam
) {
  var nv = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );
  nv.tongLuong = nv.tinhTongLuong();
  nv.xepLoai = nv.xepLoai();
  return nv;
}
function ThemNV() {
  var taiKhoan = GetElementID('tknv').value;
  var hoTen = GetElementID('name').value;
  var email = GetElementID('email').value;
  var password = GetElementID('password').value;
  var date = GetElementID('datepicker').value;
  var luongCB = GetElementID('luongCB').value;
  var chucVu = GetElementID('chucvu').value;
  var gioLam = GetElementID('gioLam').value;
  // validation
  var isValid = checkValidation(
    taiKhoan,
    hoTen,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );
  // check tài khoản
  isValid &= validation.checkTaiKhoanTrung(
    taiKhoan,
    'tbTKNV',
    'Tài khoảng đã tồn tại!',
    dsnv.mangNV
  );
  if (isValid) {
    var nv = KetQuaKhiIsValid(
      taiKhoan,
      hoTen,
      email,
      password,
      date,
      luongCB,
      chucVu,
      gioLam
    );
    dsnv.themNV(nv);
    HienThiBang(dsnv.mangNV);
    setLocalStorage();
  }
}
/**
 * Xóa
 */
function XoaNhanVien(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  HienThiBang(dsnv.mangNV);
  setLocalStorage();
}
/**
 * Xem thông tin
 */
function XemThongTin(taiKhoan) {
  var viTri = dsnv.timViTri(taiKhoan);
  if (viTri == -1) {
    alert('Không tìm thấy');
  } else {
    var nv = dsnv.mangNV[viTri];
    console.table(nv);
    GetElementID('tknv').value.disabled = true;
    GetElementID('tknv').value = nv.taiKhoan;
    GetElementID('name').value = nv.hoTen;
    GetElementID('email').value = nv.email;
    GetElementID('password').value = nv.matKhau;
    GetElementID('datepicker').value = nv.ngayLam;
    GetElementID('luongCB').value = nv.luongCB;
    GetElementID('chucvu').value = nv.chucVu;
    GetElementID('gioLam').value = nv.gioLam;
  }
}
/**
 * Reset
 */
function ResetForm() {
  GetElementID('tknv').value.disabled = false;
  GetElementID('formNV').reset();
}
/**
 * Cập nhập
 */
function CapNhapSinhVien() {
  var taiKhoan = GetElementID('tknv').value;
  var hoTen = GetElementID('name').value;
  var email = GetElementID('email').value;
  var password = GetElementID('password').value;
  var date = GetElementID('datepicker').value;
  var luongCB = GetElementID('luongCB').value;
  var chucVu = GetElementID('chucvu').value;
  var gioLam = GetElementID('gioLam').value;
  var isValid = checkValidation(
    taiKhoan,
    hoTen,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );
  if (isValid) {
    var nv = KetQuaKhiIsValid(
      taiKhoan,
      hoTen,
      email,
      password,
      date,
      luongCB,
      chucVu,
      gioLam
    );
    dsnv.capNhapNV(nv);
    HienThiBang(dsnv.mangNV);
    setLocalStorage();
  }
}
/**
 * Tìm kiếm
 */
function TimKiemNhanVien() {
  var tuKhoaTimKiem = GetElementID('searchName').value;
  var arrKetQua = dsnv.timKiem(tuKhoaTimKiem);
  HienThiBang(arrKetQua);
}
GetElementID('searchName').addEventListener('keyup', TimKiemNhanVien);
