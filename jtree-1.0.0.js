$.fn.folderTree = function(object) {
    var ul = $("<ul/>", {
        "class": "tree_view"
    });
    parseChild(ul, object[0].Subtree);
    this.append(ul);
    rearrange();

};
$("li").click(function(e) {
    e.stopPropagation();
    $(this).children("ul").slideToggle();
});

function parseChild(htmlObj, parent) {
    $.each(parent, function(i, val) {
        var sub = $("<li/>");
        var anchor = $("<a/>", {
            "class": ""
        });
        var italic = $("<i/>", {
            "class": "fa fa-folder-open-o"
        });
        var italics_file = $("<i/>", {
            "class": "fa fa-file"
        });
        sub.append(anchor);
        if (val.Subtree != null) {
            anchor.append(italic);
        } else {
            anchor.append(italics_file);
        }
        anchor.append($("<span/>", {
            text: val.name
        }));
        htmlObj.append(sub);
        if (val.Subtree != null) {
            var subUl = $("<ul/>", {
                "class": "subUl"
            });
            sub.append(subUl);
            parseChild(subUl, val.Subtree);
        }
    });
}

function rearrange() {
    $('li ul').each(function(){
        var temp = 0;
        var ul = $(this);
        ul.children('li').each(function() {
            if ($(this).children('ul').length > 0) {
                $(this).prependTo(ul);
            };
        });
        ul.slideToggle();
    });
}