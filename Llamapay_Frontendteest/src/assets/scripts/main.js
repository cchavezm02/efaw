window.addEventListener('scroll', function() {
    var btnArriba = document.getElementById('up');
    if (window.scrollY > 500) {
      btnArriba.style.display = 'block';
    } else {
      btnArriba.style.display = 'none';
    }
});

var btnRegresarArriba = document.getElementById('up');