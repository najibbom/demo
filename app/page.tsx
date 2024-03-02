'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TextareaForm } from '@/components/form-input';
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50">
      <Card>
        <CardHeader>
          <Image
            src={'/Recruitable.svg'}
            alt="logo"
            width={140}
            height={140}
            className="pb-4 flex flex-col items-center justify-center"
          />
          <CardTitle>Candidate Evaluation</CardTitle>
          <CardDescription>
            Soft skills and Psychometrics measurement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TextareaForm />
        </CardContent>
      </Card>
    </div>
  );
}
