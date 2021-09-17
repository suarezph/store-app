import { Flex, Heading } from '@chakra-ui/react'

export type HeroProps = {
  title: string
}

export const Hero = ({ title='with-chakra-ui' }: HeroProps) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading
      fontSize="10vw"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
    >
      {title}
    </Heading>
  </Flex>
)