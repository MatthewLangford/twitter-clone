$(document).ready(function () {
    jQuery("time.timeago").timeago();

    var counter = $('#char-count');
    var tweetButton = $('#tweet-submit');
    var tweetBox = $('.tweet-compose');
    var tweetAction = $('.tweet-actions');
    var originalCount = parseInt(counter.html());
    // var originalCount = 5;

    $(tweetButton).hide();
    $(counter).hide();
    tweetAction.hide();
    $('.stats').hide();


    $(tweetBox).on('click',function (e) {
       $(tweetBox).css('height', '5em');
        $(tweetButton).show();
        $(counter).show();
    });

    $(tweetBox).on('keypress', function (e) {
        if (originalCount === 140){
            originalCount--;
        }
        counter.html(originalCount - tweetBox.val().length);

        if(tweetBox.val().length >= (originalCount - 10)){
            counter.css('color', 'red');
        }
        if(tweetBox.val().length > originalCount){
            tweetButton.prop('disabled', 'true');
        }
    });
    $(tweetBox).on('keyup', function (e) {
        if (originalCount === 139){
            originalCount++;
        }
        if (e.keyCode === 8) {
            counter.html(originalCount - tweetBox.val().length);

            if (tweetBox.val().length <= originalCount - 11) {
                counter.css('color', '#999');
            }
            if (tweetBox.val().length <= originalCount + 1) {
                tweetButton.prop('disabled', false);
            }
        }
    });



    tweetButton.on('click',function (e) {
       if(tweetBox.val() && tweetBox.val().length <= originalCount){
           var newTweet = tweetBox.val();
           var timeStamp = jQuery.timeago(new Date());
           $('#stream').prepend('<div class="tweet">' +
                                '<div class="content">' +
                                '<img class="avatar" src="img/alagoon.jpg">' +
                                '<strong class="fullname">Your name here</strong>' +
                                '<span class="username"> @YourNameHere</span>' +
                                '<p class="tweet-text">' + newTweet + '</p>' +
                                '<div class="tweet-actions">' +
                                '<ul>' +
                                '<li><span class="icon action-reply"></span> Reply</li>' +
                                '<li><span class="icon action-retweet"></span> Retweet</li>' +
                                '<li><span class="icon action-favorite"></span> Favorite</li>' +
                                '<li><span class="icon action-more"></span> More</li>' +
                                '</ul>' +
                                '</div>' +
                                '</div>' +
                                '<div class="stats">' +
                                '<div class="retweets">' +
                                '<p class="num-retweets">0</p>' +
                                '<p>RETWEETS</p>' +
                                '</div>' +
                                '<div class="favorites">' +
                                '<p class="num-favorites">0</p>' +
                                '<p>FAVORITES</p>' +
                                '</div>' +
                                '<div class="users-interact">' +
                                '<div>'+
                                '<img src="img/vklimenko.jpg" />' +
                                '<img src="img/funwatercat.jpg" />' +
                                '</div>' +
                                '</div>' +
                                '<div class="time">' + timeStamp + '</div>' +
                                '</div>'+
                                '<div class="reply">' +
                                '<img class="avatar" src="img/alagoon.jpg" />' +
                                '<textarea class="tweet-reply" placeholder="Reply to @YourNameHere"/></textarea>' +
                                '</div>' +
                                '</div>');
       }
        $('.tweet-actions').hide();
        //$('.stats').hide();

        tweetBox.val("");
        counter.html(tweetBox.val().length + originalCount);
    });

    $('.content').hover(function () {
        $(this).find(tweetAction).toggle(300);
        $(this).find(".stats").toggle(300);
    });
});
