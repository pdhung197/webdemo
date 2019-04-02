
var hoisting_example = "test_hoisting_AAA";
document.write("Index javascript");
(function ($) {
  $("#btn").click(function () {
    alert("ok");
  });
  $(document).ready(function () {
    $("#imgid")
      .on("load", function () {
        console.log("Image Loaded");
      })
      .each(function () {
        if (this.complete) $(this).trigger("load");
      });
    console.log("document");
    $("#textdiv").on("change", 'input[type="text"]', function () {
      $('label[for="' + $(this).attr("id") + '"]').text($(this).val());
    });
    $("#addinputbtn").click(function () {
      addaninput2();
    });

    $("#removeadd").click(function () {
      $("#textdiv").off("change", 'input[type="text"]');
    });

    class Animal {
      constructor(name) {
        this.name = name;
      }
      eat() {
        console.log("Eating..");
      }
    }

    class Bird extends Animal {
      eat() {
        super.eat();
        console.log("on farm...");
      }
      fly() {
        console.log("Flying...");
      }
    }

    class Parrot extends Bird {
      fly() {
        super.fly();
        console.log("on the sky ...");
      }
      speak() {
        console.log("Speaking...");
      }
    }

    const bird = new Parrot("Két");
    console.log(bird.name, "can");
    bird.eat();
    bird.fly();
    bird.speak();

    let foo = 1;
    function printFoo(shouldDo) {
      if (shouldDo) {
        let foo = 2;
      }
      return foo;
    }
    console.log(printFoo(false)); // undefined
    console.log(printFoo(true)); // 2

    function log(a, ...numbers) {
      console.log(a);
      console.log(numbers);
      console.log(...numbers);
    }
    log(
      "abc",
      { num: 2 },
      3,
      ["a", "f", "b"],
      5,
      "as",
      { "1": "a", "2": "b", length: 2 },
      8
    );

    function sum(a, b) {
      const c = a + b;
      return () => console.log(c);
    }
    sum(4, 5)();

    let a = [1, 2, 3];
    a[-1] = 4;
    a[10] = 5;

    console.log(a[6], a.length, a[-2]);

    demo();

    function xo_so_kien_thiet() {
      var luckyNumber = Math.floor(Math.random() * 10);

      // closure đây
      return function bang_phong_thien_dia() {
        return luckyNumber;
      };
    }

    var soi_ket_qua = xo_so_kien_thiet();
    console.log(soi_ket_qua());
    console.log(soi_ket_qua());
    console.log(soi_ket_qua());

    var newarr = [1, 2, 3, 4, 5];
    var newarr2 = newarr.slice();
    newarr2[1] = 5;
    console.log({ newarr, newarr2 });
    console.log(false == false);

    globalfunction();
    explainHoisting();

    var key1 = Symbol();
    var key2 = Symbol();
    var obj = {};
    obj[key1] = "Vũ Thanh Tài";
    obj[key2] = "Toidicode.com";
    console.log(obj);
    //{Symbol(): "Vũ Thanh Tài", Symbol(): "Toidicode.com"}
    console.log(JSON.stringify(obj));
    //{}
    console.log(Object.getOwnPropertyNames(obj));
    // []
    console.log(Object.getOwnPropertySymbols(obj));
    //[Symbol(), Symbol()]
    console.log(obj[key1]);
    //Vũ Thanh Tài
    console.log(obj[key2]);
    //Toidicode.com
  });
  $(window).on("load", function () {
    console.log("window");
    console.log(isStrictMode());
  });

  function isStrictMode() {
    console.log(typeof this);
    return typeof this === "undefined";
  }

  function demo() {
    /* const arr = [32,35,3453445,645,75,7568,7869,8797,97];
        const [a,b] = arr;
        console.log([a,b]); */
    const obj = {
      a: 1,
      b: 2,
      c: {
        z: 100
      }
    };
    const { a, ...c } = obj;
    console.log(c);
  }
  function newpromfunc() {
    return new Promise(function (res, rej) {
      if ($('input[type="text"]').length >= 5) return rej();
      return res();
    });
  }

  function addaninput() {
    newpromfunc()
      .then(() => {
        $("#textdiv").prepend(`<input type="text" name="${$(
          'input[type="text"]'
        ).length + 1}" id="${$('input[type="text"]').length + 1}" value="">
                <label for="${$('input[type="text"]').length + 1}">Test ${$(
          'input[type="text"]'
        ).length + 1}</label>`);
      })
      .catch(() => console.log("Quá 5 input"));
  }
  function addmessage(newtext) {
    $("#notifmess").append(`<span>${newtext}</span><br />`);
  }
  async function addaninput2() {
    try {
      await newpromfunc();
      $("#textdiv").prepend(`<input type="text" name="${$('input[type="text"]')
        .length + 1}" id="${$('input[type="text"]').length + 1}" value="">
            <label for="${$('input[type="text"]').length + 1}">Test ${$(
          'input[type="text"]'
        ).length + 1}</label>`);
      addmessage("Đã add input");
    } catch (error) {
      addmessage("Quá 5 input", error);
    }
  }

  function globalfunction() {
    var mouse = {
      name: "Mikey",
      sayHi: function () {
        console.log(this.name);
      }
    };
    var ms = mouse.sayHi.apply(mouse);
    mouse.sayHi();
    //ms();
  }

  function explainHoisting() {
    var hoisting_example;
    console.log(hoisting_example);
    var hoisting_example = "testing_hoisting_BBB";
    console.log(hoisting_example);
  }
})(jQuery);
