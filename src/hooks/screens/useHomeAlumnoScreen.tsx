import { useState } from "react";

export const useHomeAlumnoScreen = () => {
    const motivationalQuotes = [
        "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito. - Albert Schweitzer",
        "La única manera de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
        "No cuentes los días, haz que los días cuenten. - Muhammad Ali",
        "La vida es 10% lo que me ocurre y 90% cómo reacciono a ello. - Charles R. Swindoll",
        "La mejor manera de predecir el futuro es crearlo. - Peter Drucker",
        "No importa cuán lento vayas, siempre y cuando no te detengas. - Confucio",
        "Todo lo que puedes imaginar es real. - Pablo Picasso",
        "El único lugar donde el éxito viene antes que el trabajo es en el diccionario. - Vidal Sassoon",
        "La creatividad es la inteligencia divirtiéndose. - Albert Einstein",
        "El fracaso es el condimento que da sabor al éxito. - Truman Capote",
        "La forma de empezar es dejar de hablar y comenzar a hacer. - Walt Disney"
    ];

    const getRandomMotivationalQuote = () => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        return motivationalQuotes[randomIndex];
    }

    return {
        getRandomMotivationalQuote
    }
}

