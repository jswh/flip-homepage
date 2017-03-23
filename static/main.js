var rowsSize = 11;
var margin = 5;
var widthHeightRatio = 1.51;
var randomColors = ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#34495e', '#e67e22', '#e74c3c'];
var flipBlocks = {
    "5-2": {
        content:"<a href='http://gallery.jswh.me'><h2>gallery<h2></a>"
    },
    "4-4": {
        content:"<a href='https://github.com/jswh'><h2>github<h2></a>"
    },
    "9-5": {
        content:"<a href='http://www.linkedin.com/in/%E6%9B%B9-%E7%BB%B4%E6%9D%B0-a46255117/'><h2>linkedin<h2></a>"
    },
    "7-3": {
        content:"<a href='http://blog.jswh.me'><h2>blog<h2></a>"
    }
};
var blocks = {
    rowSize: 11,
    colSize: 6,
    specials: {
        "1": {
            width:0.2,
            margin:2,
            subStyleDefault: {
                width:0
            },
            "3": {
                height:0.3,
                "margin-top": -0.25
            },
        },
        "2": {
            width:0.3,
            margin:2,
            subStyleDefault: {
                width:0
            },
            "2": {
                height: 0.4,
                "margin-top": 0.85
            },
            "3": {
                height: 0.4,
                "margin-top": 0.2
            }
        },
        "3": {
            width:0.5,
            margin:2,
            subStyleDefault: {
                height: 0.6,
                "margin-top": 0.1
            },
            "1": {
                display:"none"
            },
            "2": {
                height: 0.6,
                "margin-top": 3.5
            }
        },
        "4": {
            width:1,
            margin:2,
            "1": {
                width: 0.5,
                height: 0.6,
                "margin-left": 0.9,
                "margin-top": 1
            },
            "6":{
                width: 0.5,
                height: 0.6,
                "margin-left": 0.9,
            }
        },
        "9": {
            "1": {
                width: 0.5,
                height: 0.6,
                "margin-top": 1
            },
            "6":{
                width: 0.5,
                height: 0.6,
            }
        },
        "10": {
            width:0.5,
            margin:2,
            subStyleDefault: {
                width: 0
            },
            "4": {
                height:0.6,
                "margin-top": 0.9
            },
            "5": {
                height:0.6,
                "margin-top": 0.1
            }
        },
        "11": {
            width:0.3,
            margin:2,
            subStyleDefault: {
                width: 0
            },
            "5": {
                height: 0.4,
                "margin-top": -0.4
            }
        }
    }
}
$(document).ready(function () {
    if (window.innerWidth > 500) {
        desktop();
    } else {
        mobile();
    }
    setTimeout(function() {
        $('#mask img').fadeOut(100);
        $('#mask').fadeOut(500);
    }, 100);
});

function mobile() {
    var $container = $('#container');
    $container.css('width', '100%')
    $container.css('height', 'auto');
    var divCouter = 0;
    for (var i in flipBlocks) {
        var $div = $("<div></div>");
        $div.css('width', '100%');
        $div.css('height', '60%');
        $div.css('margin-bottom', '5px')
        setAsFlipBlock($div, flipBlocks[i].content);
        $container.append($div);
        divCouter ++;
    }

    setBlockBackground($container, 0, 0);
}

function desktop() {
    var $container = $('#container');
    if (window.innerWidth < 1024) {
        $container.height(window.innerWidth * 0.45)
    }
    var heightBase = $container.height();
    var widthBase = 0;

    var cellHeight = heightBase / blocks.colSize - margin;
    var cellWidth = cellHeight * widthHeightRatio;

    var subDivs = [];
    for (var i = 1; i <= blocks.rowSize; i ++) {
        var $div = $("<div></div>");
        var rowSetting = {
            width: cellWidth,
            margin: margin
        }
        var cssTestees = ['width', 'margin']
        //set special rowSetting
        cssTestees.forEach(function(testee) {
            if (blocks.specials[i] && blocks.specials[i][testee]) {
                rowSetting[testee] = rowSetting[testee] * blocks.specials[i][testee]
            }
        });
        //get the row base
        widthBase = widthBase + rowSetting.width + rowSetting.margin;
        //create row
        $div.css({
            'width': rowSetting.width + 'px',
            'margin-left': rowSetting.margin + 'px'
        });
        //create blocs of this row
        for (var j = 1; j <= blocks.colSize; j ++) {
            var $sub = $("<div></div>");
            $sub.css({
                'display': 'block',
                'height': cellHeight,
                'margin': margin + 'px 0 0 0'
            })
            var cellCss = null;
            if (blocks.specials[i]) {
                if (blocks.specials[i][j]) {
                    cellCss = blocks.specials[i][j]
                    cellCss = recaculatSize(cellCss, 'height', cellHeight, 'margin-top')
                    cellCss = recaculatSize(cellCss, 'width', cellWidth, 'margin-left')
                    $sub.css(cellCss)
                } else if (blocks.specials[i]['subStyleDefault']) {
                    cellCss = blocks.specials[i]['subStyleDefault']
                    cellCss = recaculatSize(cellCss, 'height', cellHeight, 'margin-top')
                    $sub.css(cellCss)
                }
            }

            var blockId = i + '-' + j;
            if (flipBlocks[blockId]) {
                setAsFlipBlock($sub, flipBlocks[blockId].content);
            }

            $div.append($sub);
        }
        subDivs.push($div);
    }

    $container.width(widthBase);
    $container.append(subDivs);
    setTimeout(function() {
        setBlockBackground($container, widthBase, heightBase)
    }, 100);

    function recaculatSize(css, cssAttrName, AttrDefaultValue, marginName) {
        if (css[cssAttrName] && css[cssAttrName].toString().indexOf('px') == -1) {
            css[marginName] = (margin + css[marginName] * AttrDefaultValue * (1 - cellCss[cssAttrName])) + 'px';
            css[cssAttrName] = (AttrDefaultValue * css[cssAttrName]) + 'px';
        }

        return css;
    }
}
function setAsFlipBlock($sub, content) {
    $front = $("<div class='front'></div>");
    $back = $("<div class='back'></div>");
    $back.html(content);
    $sub.append($front);
    $sub.append($back);
    setBlockFlip($sub);
    setBlocFontRandomColor($sub);
}
function setBlockBackground($container, widthBase, heightBase, background='static/background.jpg') {
    $('#container>div>div').each(function (i, item) {
        var offsetBase = $container.offset();
        var $item = $(item);
        var offset = $item.offset();
        var $front = $item.find('.front');

        if ($front.length > 0) {
            $item = $front;
        }
        var position = (offsetBase.left - offset.left) + 'px ' + (offsetBase.top - offset.top) + 'px'
        $item.css({
            'background-image': 'url(' + background + ')',
            'background-position': position
        });
        if (widthBase > 0) {
        $item.css({
            'background-size': widthBase + 'px ' + heightBase + 'px'
        });
        }
    });
}
function setBlockFlip($block) {
    $block.flip({
        axis: 'x',
        trigger: 'manual',
    });
    var autoFlip = function () {
        $block.flip('toggle')
    };
    var flipDelay = function () {
        return 2000 + Math.random() * 4000;
    };
    var id = setInterval(autoFlip, flipDelay());
    var onMouseenter = function() {
        clearInterval(id);
        $block.flip(true);
        $block.one('mouseleave', function() {
            $block.flip(false);
            id = setInterval(autoFlip, flipDelay());
            $block.one('mouseenter', onMouseenter)
        })
    };
    $block.one('mouseenter', onMouseenter);
    setTimeout(function() {
        $block.flip('true');
    }, Math.random() * 2000);
}
function setBlocFontRandomColor($block) {
    var $a = $block.find('a');
    setInterval(function () {
        var color = randomColors[Math.floor(Math.random() * randomColors.length)];
        $a.css({ color: color });
    }, 3000)
}