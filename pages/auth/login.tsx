import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { fetchRequest } from 'utils/fetch.util'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { paramsQuery } from 'utils/helpers.util'

export default function Login() {
  const toast = useToast()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState
  const [errorAPIMessage, setErrorAPIMessage] = useState<string | null>(null)

  useEffect(() => {
    if (errorAPIMessage) {
      toast({
        title: 'Login Failed',
        description: errorAPIMessage,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    }
  }, [errorAPIMessage])

  async function onSubmit({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    fetchRequest
      .post('/users/auth', {
        email,
        password,
      })
      .then(() => {
        const { visited } = paramsQuery()

        return Router.replace(visited ? visited : '/admin/dashboard')
      })
      .catch(err => setErrorAPIMessage(err.message))
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to access all of our new <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register('email')} />
                <p>{errors.email?.message}</p>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register('password')} />
                <p>{errors.password?.message}</p>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
