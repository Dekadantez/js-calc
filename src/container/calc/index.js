class Calc {
  static #value = ''
  static #NAME = 'calc' //ключ
  static #isDot = false //властивість яка вказує чи стоїть вже крапка чи ні

  static add = (newValue) => {
    // коли тискнемо певне число воно додається в калькулятор в поле вводу
    //функція конкат додає в кінець певний рядок
    if (isNaN(this.#value[this.#value.length - 2])) {
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot == false
      ) {
        return null
      } // перевірка якщо вже стоїть нуль, то більше писати нуль не можемо(щоб не виходило число такого типу 00000.555)
      // разом з тим ізДот повинен бути фолз
    }

    this.#value = this.#value.concat(newValue)
    this.#output()
  }

  static #output = () => {
    //функція яка вписує(відображає) значення в поле вводу
    this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    //функція яка відображає крапку
    if (this.#isDot) {
      return null
    }
    if (isNaN(this.#value[this.#value.length - 1])) {
      //первірка чи є останній знак в полі вводу числом,якщо ні, то неможна поставити жоден знак обчислення після нього
      return null
    }

    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  static op = (opValue) => {
    //метод який додає та виводить знаки обчислення
    if (isNaN(this.#value[this.#value.length - 1])) {
      //первірка чи є останній знак в полі вводу числом,якщо ні, то неможна поставити жоден знак обчислення після нього
      return null
    }
    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }

  static reset = () => {
    //функція яка очищує поле вводу
    this.#value = ''
    this.#isDot = false
    this.#output()
  }

  static result = () => {
    //функція яка проводить обчислення
    this.#value = String(eval(this.#value))
    this.#output()
  }

  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }

  static #load = () => {
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }

  static init = () => {
    //функція яка ініціалізує калькулятор
    this.#load()
    this.#output()
    console.log('Calc is init')
  }
}

Calc.init()

window.calc = Calc
