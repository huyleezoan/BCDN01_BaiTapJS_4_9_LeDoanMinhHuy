// Tạo lớp nhân viên

function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = 0;
  this.xepLoai = '';
  this.tinhTongLuong = function () {
    switch (chucVu) {
      case 'Sếp': {
        return this.luongCB * 3;
      }
      case 'Trưởng phòng': {
        return this.luongCB * 2;
      }
      case 'Nhân viên': {
        return this.luongCB;
      }
    }
  };

  this.xepLoai = function () {
    if (this.gioLam >= 192) {
      return 'Xuất sắc';
    } else if (this.gioLam >= 176) {
      return 'Giỏi';
    } else if (this.gioLam >= 160) {
      return 'Khá';
    } else {
      return 'Trung bình';
    }
  };
}
