import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata = {
  title: 'About CST Canteen - Easy Food Platform',
  description: 'Learn about CST Canteen, our story, values, and team members.',
};

export default function About() {
  return <AboutContent />;
}