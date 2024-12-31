'use client';

import { Card, Button } from 'flowbite-react';

// Пример данных персонажей
const characters = [
  {
    id: 1,
    name: 'Алиса',
    image: '',
    description: 'Храбрая девочка, попавшая в страну чудес.',
  },
  {
    id: 2,
    name: 'Боб',
    image: '',
    description: 'Мудрый старец, обладающий магическими силами.',
  },
];

export default function KrasnoeBedstvieCharacters() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto pb-4 pt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {characters.map((character) => (
            <Card
              key={character.id}
              imgAlt={character.name}
              imgSrc={character.image}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {character.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {character.description}
              </p>
              <div className="mt-4">
                <Button>Подробнее</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
