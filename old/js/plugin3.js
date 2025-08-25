$('document').ready(function() {
    $('.filter-tags li').click( function(){
        $(this).addClass('active').siblings().removeClass('active');
        /*
        if ($(this).data('filter') === 'all') {
            $('.filter').find('li').fadeIn(400);
        } else {
            data_filter = $(this).data('filter');
            $('.filter li').siblings().fadeOut(400);
            $('.filter').find('[filter='+data_filter+']').fadeIn(400);
        }
        */
        s = new shuflle()
        s.triggerShuflle('shuflle');
    })
});
function triggerShuflle(elemet_id = 'shuflle'){
    let shuflle = document.getElementById(elemet_id);
    let btns = shuflle.querySelectorAll('.filter-tags li');
    let ports = shuflle.querySelectorAll('.filter li');
    btns.forEach(function (btn) {
        btn.addEventListener('click', e => {
            data_filter = e.target.dataset.filter;
            ports.forEach(e => {
                if(data_filter === 'all'){
                    shuflle.querySelectorAll('.filter li').forEach(item => {
                        item.style.display = 'block';
                    })
                }
                else {
                    shuflle.querySelectorAll('.filter li').forEach(item => {
                        item.style.display = 'none';
                    });
                    shuflle.querySelectorAll('[filter='+data_filter+']').forEach(item=>{
                        item.style.display = 'block';
                    })
                }
            })
        })
    })
}




document.querySelector('.filter-tags li').addEventListener('click', function (e) {

});
window.onscroll = function() {

};
