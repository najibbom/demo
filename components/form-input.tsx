'use client';

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale);

import { Bar } from 'react-chartjs-2';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
// import { toast, useToast } from '@/components/ui/use-toast';
import { SetStateAction, useState } from 'react';

const FormSchema = z.object({
  bio: z.string().min(10, {
    message: 'Input must be at least 10 characters.',
  }),
  classes: z.string().min(5, {
    message: 'Class name must be at least 5 characters.',
  }),
});

// I disagree with that I am the life of the party and strongly agree with that I sympathize with others' feelings and agree with that I get chores done right away and strongly agree with that I have frequent mood swings and agree with that I have a vivid imagination and strongly agree with that I do not talk a lot and strongly disagree with that I am not interested in other people's problems and strongly disagree with that I often forget to put things back in their proper place and strongly agree with that I am relaxed most of the time and agree with that I am not interested in abstract ideas and agree with that I talk to a lot of different people at parties and agree with that I feel others' emotions and agree with that I like order and strongly disagree with that I get upset easily and strongly disagree with that  I have difficulty understanding abstract ideas and strongly disagree with that I keep in the background and agree with that I am not really interested in others and strongly disagree with that I make a mess of things and strongly disagree with that I seldom feel blue and strongly disagree with that I am not have a good imagination

// Communication, problem-solving, Entrepreneurship , Leadership, Interpersonal Skills, Presentation

export function TextareaForm() {
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaValue2, setTextareaValue2] = useState('');

  const handleTextareaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTextareaValue(event.target.value);
  };
  const handleTextareaChange2 = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTextareaValue2(event.target.value);
  };

  const processText = () => {
    console.log('Text from textarea 1:', textareaValue);
    console.log('Text from textarea 2:', textareaValue2);

    query({
      inputs: textareaValue,
      parameters: { candidate_labels: textareaValue2.split(',') },
    }).then((response) => {
      console.log(JSON.stringify(response['labels']));
      console.log(JSON.stringify(response['scores']));

      const labels = JSON.stringify(response['labels']);
      const scores = JSON.stringify(response['scores']);
    });
  };

  // const dddata = {
  //   labels: [textareaValue2],
  //   datasets: [{ label: 'Classes', data: [textareaValue2] }],
  // };
  const handleClick = () => {
    processText();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // const { toast } = useToast();

  async function query(data: {
    inputs: string;
    parameters: { candidate_labels: string[] };
  }) {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/cross-encoder/nli-deberta-v3-small',
      {
        headers: {
          Authorization: 'Bearer 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',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  // const [userData, setUserData] = useState({
  //   labels: textareaValue2,
  //   datasets: [
  //     {
  //       label: 'Classes',
  //       data: [
  //         0.356445848941803, 0.1899804323911667, 0.17257702350616455,
  //         0.11269429326057434, 0.08463656157255173, 0.0836658626794815,
  //       ],
  //       backgroundColor: [
  //         'red',
  //         'green',
  //         'blue',
  //         'yellow',
  //         'purple',
  //         'orange',
  //         'pink',
  //       ],
  //       borderColor: 'black',
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-zinc-600">
                Input for evalution
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="For a given input the model will give a scores corresponding to the labels given"
                  className="resize-none w-[420px]"
                  {...field}
                  value={textareaValue}
                  onChange={handleTextareaChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="classes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-zinc-600">
                Possible class names (comma-separated)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Class names"
                  className="resize-none w-[420px]"
                  {...field}
                  value={textareaValue2}
                  onChange={handleTextareaChange2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-[420px]"
          variant={'goplatform'}
          type="submit"
          onClick={() => {
            handleClick();
          }}
        >
          Compute
        </Button>
      </form>
      {/* <div className="container pt-14 w-[420px] h-[420px]">
        <Bar data={userData} />
      </div> */}
    </Form>
  );
}
