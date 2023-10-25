'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckIcon,
  CreditCardIcon
} from '@bitcoin-design/bitcoin-icons-react/filled'

import { LaWalletContext } from '@/context/LaWalletContext'
import { formatToPreference } from '@/lib/formatter'

import {
  Flex,
  Heading,
  Text,
  Divider,
  LinkButton,
  Button,
  Keyboard,
  QRCode,
  Confetti,
  Icon,
  Sheet
} from '@/components/UI'
import Container from '@/components/Layout/Container'
import TokenList from '@/components/TokenList'
import { Loader } from '@/components/Loader/Loader'
import { useNumpad } from '@/hooks/useNumpad'

import theme from '@/styles/theme'

export default function Home() {
  const router = useRouter()

  const { userConfig } = useContext(LaWalletContext)
  const numpadData = useNumpad(userConfig.props.currency)

  const [finished, setFinished] = useState<boolean>(false)
  const [showSheet, setShowSeet] = useState<boolean>(false)

  const handlePrint = () => {}

  const handleCloseSheet = () => {
    setShowSeet(false)
  }

  return (
    <>
      {finished ? (
        <>
          <Confetti />
          <Container size="small">
            <Divider y={24} />
            <Flex
              direction="column"
              justify="center"
              flex={1}
              align="center"
              gap={8}
            >
              <Icon color={theme.colors.primary}>
                <CheckIcon />
              </Icon>
              <Text size="small" color={theme.colors.gray50}>
                Pago acreditado
              </Text>
              <Flex justify="center" align="center" gap={4}>
                {userConfig.props.currency !== 'SAT' && <Text>$</Text>}
                <Heading>
                  {formatToPreference(
                    userConfig.props.currency,
                    numpadData.intAmount[numpadData.usedCurrency]
                  )}
                </Heading>
              </Flex>
            </Flex>
            <Flex gap={8} direction="column">
              <Flex>
                <Button variant="bezeled" onClick={handlePrint}>
                  Imprimir comprobante
                </Button>
              </Flex>
              <Flex>
                <Button variant="bezeledGray" onClick={() => router.push('/')}>
                  Cancelar
                </Button>
              </Flex>
            </Flex>
            <Divider y={24} />
          </Container>
        </>
      ) : (
        <>
          <Container size="small">
            <Divider y={24} />
            <Flex
              direction="column"
              justify="center"
              align="center"
              gap={8}
              flex={1}
            >
              <Loader />
              <Text size="small" color={theme.colors.gray50}>
                Esperando pago
              </Text>
              <Flex justify="center" align="center" gap={4}>
                {userConfig.props.currency !== 'SAT' && <Text>$</Text>}
                <Heading>
                  {formatToPreference(
                    userConfig.props.currency,
                    numpadData.intAmount[numpadData.usedCurrency]
                  )}
                </Heading>

                <Text>{userConfig.props.currency}</Text>
              </Flex>
            </Flex>
            <Divider y={24} />
          </Container>

          <QRCode value={'algo'} />

          <Flex>
            <Container size="small">
              <Divider y={16} />
              <Flex gap={8} direction="column">
                <Flex>
                  <Button variant="bezeled" onClick={() => setShowSeet(true)}>
                    Escanear tarjeta
                  </Button>
                </Flex>
                <Flex>
                  <Button
                    variant="bezeledGray"
                    onClick={() => router.push('/')}
                  >
                    Cancelar
                  </Button>
                </Flex>
              </Flex>
              <Divider y={24} />
            </Container>
          </Flex>
        </>
      )}

      <Sheet
        title={'Listo para escanear'}
        isOpen={showSheet}
        onClose={handleCloseSheet}
      >
        <Container>
          <Flex direction="column" flex={1} align="center" justify="center">
            <Icon color={theme.colors.primary}>
              <CreditCardIcon />
            </Icon>
            <Divider y={8} />
            <Text align="center">
              Sostenga su dispositivo cerca de la etiqueta NFC.
            </Text>
          </Flex>
        </Container>
      </Sheet>
    </>
  )
}
