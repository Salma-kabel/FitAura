import React from 'react';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '@/interfaces/layout';
import { MainLayout } from '@/components/layout';
// import { HomeFeature, HomeHero, HomePopularCourse, HomeTestimonial, HomeOurCoachs, DynamicHomeNewsLetter } from '@/components/home'

const DynamicHello = dynamic(() => import('../../components/hello'));

const Hello: NextPageWithLayout = () => {
  return (
    <>
      <DynamicHello name="John" />
    </>
  );
};

Hello.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Hello;
