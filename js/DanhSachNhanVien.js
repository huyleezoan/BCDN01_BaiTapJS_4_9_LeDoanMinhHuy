function DanhSachNhanVien() {
  this.mangNV = [];

  this.themNV = function (nv) {
    this.mangNV.push(nv);
  };

  this.timViTri = function (taiKhoan) {
    var viTri = -1;
    this.mangNV.map(function (item, index) {
      if (item.taiKhoan == taiKhoan) {
        viTri = index;
      }
    });
    return viTri;
  };

  this.xoaNV = function (taiKhoan) {
    var viTri = this.timViTri(taiKhoan);
    if (viTri == -1) {
      alert('Không tìm thấy nhân viên');
    } else {
      this.mangNV.splice(viTri, 1);
    }
  };
  this.capNhapNV = function (nv) {
    var viTri = this.timViTri(nv.taiKhoan);
    if (viTri == -1) {
      alert('Không được thay đổi mã sinh viên');
    } else {
      this.mangNV[viTri] = nv;
    }
  };
}
DanhSachNhanVien.prototype.timKiem = function (tuKhoaTimKiem) {
  var arrKetQua = [];
  var lowerTimKiem = tuKhoaTimKiem.trim().toLowerCase();
  this.mangNV.map(function (item, index) {
    var xepLoai = item.xepLoai.trim().toLowerCase();
    var kq = xepLoai.indexOf(lowerTimKiem);
    if (kq >= 0) {
      arrKetQua.push(item);
    }
  });
  return arrKetQua;
};
