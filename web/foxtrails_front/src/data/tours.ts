// src/data/tours.ts
import type { Tour } from '../types/tour';

export const tours: Tour[] = [
  {
    id: 1,
    title: "Гастрономический маршрут",
    description: "Гастрономическое путешествие по лучшим ресторанам",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=400&fit=crop",
    fullDescription: "Посетите 5 лучших ресторанов города, примите участие в мастер-классах от шеф-поваров и насладитесь авторской кухней.",
    price: "50 000 ₽",
    duration: "3 дня",
    includes: ["Проживание в 5* отеле", "Завтраки и ужины", "Трансфер", "Экскурсии"]
  },
  {
    id: 2,
    title: "Винный тур",
    description: "Маршрут по лучшим винодельням",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&h=400&fit=crop",
    fullDescription: "Дегустация лучших вин, экскурсии по виноградникам, общение с виноделами.",
    price: "45 000 ₽",
    duration: "2 дня",
    includes: ["Дегустация 10+ сортов вин", "Экскурсии", "Обеды", "Сувениры"]
  },
  {
    id: 3,
    title: "Горный маршрут",
    description: "Экстремальный тур по горам",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=400&fit=crop",
    fullDescription: "Походы в горы, скалолазание, рафтинг и другие приключения.",
    price: "60 000 ₽",
    duration: "4 дня",
    includes: ["Снаряжение", "Инструктор", "Страховка", "Питание"]
  }
];