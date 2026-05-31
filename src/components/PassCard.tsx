import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect } from 'react-native-svg';
import { PassType } from '../data/walletData';

// 21×21 QR code matrix (finder patterns + pseudo-random data cells)
const QR_MATRIX: number[][] = [
  [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,0,1,0,1,0,1,1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0],
  [1,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1],
  [0,1,1,0,1,0,0,1,0,1,0,1,1,0,1,0,1,0,0,1,0],
  [1,0,0,1,1,0,1,0,0,0,1,1,0,1,0,1,1,0,1,0,1],
  [0,1,0,1,0,1,0,1,1,0,0,1,0,0,1,0,0,1,0,1,0],
  [1,1,1,0,1,0,1,1,0,1,1,0,1,0,0,1,1,0,1,0,1],
  [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,1,1,0],
  [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,0],
  [1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1],
  [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,0],
  [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,0,1,0,1,0],
  [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,1,0],
  [1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,0,1,0,0,0,1],
];

// Barcode widths pattern (alternating dark/light bars)
const BAR_PATTERN = [2,1,3,1,2,3,1,2,1,3,2,1,2,1,3,2,1,1,3,2,1,2,1,3,1,2,3,1,2,1,3,1,2,2,1,3,1,2,1,3,2,1];

function QRCode({ size = 110 }: { size?: number }) {
  const cellSize = size / 21;
  return (
    <View style={{ backgroundColor: '#FFFFFF', padding: 6, borderRadius: 6 }}>
      <Svg width={size} height={size}>
        {QR_MATRIX.flatMap((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <Rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#000000"
              />
            ) : null
          )
        )}
      </Svg>
    </View>
  );
}

function Barcode({ width = 280, height = 56, dark = '#000000' }: { width?: number; height?: number; dark?: string }) {
  const totalUnits = BAR_PATTERN.reduce((a, b) => a + b, 0);
  const unitWidth = width / totalUnits;
  let x = 0;
  return (
    <View style={{ backgroundColor: '#FFFFFF', padding: 8, borderRadius: 6 }}>
      <Svg width={width} height={height}>
        {BAR_PATTERN.map((units, i) => {
          const barX = x;
          const barW = units * unitWidth;
          x += barW;
          return i % 2 === 0 ? (
            <Rect key={i} x={barX} y={0} width={barW} height={height} fill={dark} />
          ) : null;
        })}
      </Svg>
    </View>
  );
}

function TearLine({ textColor }: { textColor: string }) {
  return (
    <View style={styles.tearRow}>
      <View style={[styles.tearNotch, { backgroundColor: '#000' }]} />
      <View style={styles.tearDashes}>
        {Array.from({ length: 28 }).map((_, i) => (
          <View key={i} style={[styles.tearDash, { backgroundColor: textColor, opacity: 0.35 }]} />
        ))}
      </View>
      <View style={[styles.tearNotch, { backgroundColor: '#000' }]} />
    </View>
  );
}

function BoardingPass({ pass }: { pass: PassType }) {
  return (
    <LinearGradient
      colors={pass.backgroundColor as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.passCard}
    >
      {/* Header */}
      <View style={styles.boardingHeader}>
        <Text style={[styles.airlineName, { color: pass.textColor }]}>{pass.title}</Text>
        <Text style={[styles.flightNum, { color: pass.textColor, opacity: 0.7 }]}>{pass.flightNumber}</Text>
      </View>

      {/* Route */}
      <View style={styles.routeRow}>
        <View style={styles.routeCity}>
          <Text style={[styles.airportCode, { color: pass.textColor }]}>{pass.origin}</Text>
          <Text style={[styles.cityName, { color: pass.textColor, opacity: 0.65 }]}>{pass.originCity}</Text>
        </View>
        <View style={styles.routeArrow}>
          <View style={[styles.routeLine, { backgroundColor: pass.textColor, opacity: 0.3 }]} />
          <Text style={[styles.planeIcon, { color: pass.textColor }]}>✈</Text>
          <View style={[styles.routeLine, { backgroundColor: pass.textColor, opacity: 0.3 }]} />
        </View>
        <View style={[styles.routeCity, { alignItems: 'flex-end' }]}>
          <Text style={[styles.airportCode, { color: pass.textColor }]}>{pass.destination}</Text>
          <Text style={[styles.cityName, { color: pass.textColor, opacity: 0.65 }]}>{pass.destinationCity}</Text>
        </View>
      </View>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoLabel, { color: pass.textColor, opacity: 0.55 }]}>GATE</Text>
          <Text style={[styles.infoValue, { color: pass.textColor }]}>{pass.gate}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoLabel, { color: pass.textColor, opacity: 0.55 }]}>BOARDS</Text>
          <Text style={[styles.infoValue, { color: pass.textColor }]}>{pass.boardingTime}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoLabel, { color: pass.textColor, opacity: 0.55 }]}>SEAT</Text>
          <Text style={[styles.infoValue, { color: pass.textColor }]}>{pass.seat}</Text>
        </View>
      </View>

      <View style={[styles.passengerRow]}>
        <Text style={[styles.passengerName, { color: pass.textColor }]}>{pass.passengerName}</Text>
        <Text style={[styles.cabinClass, { color: pass.textColor, opacity: 0.6 }]}>{pass.subtitle}</Text>
      </View>

      <TearLine textColor={pass.textColor} />

      {/* Barcode */}
      <View style={styles.barcodeContainer}>
        <Barcode dark="#000000" />
      </View>
    </LinearGradient>
  );
}

function EventTicket({ pass }: { pass: PassType }) {
  return (
    <LinearGradient
      colors={pass.backgroundColor as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.passCard}
    >
      {/* Event Name */}
      <View style={styles.ticketHeader}>
        <Text style={[styles.eventTitle, { color: pass.textColor }]}>{pass.title}</Text>
        <Text style={[styles.eventSubtitle, { color: pass.textColor, opacity: 0.65 }]}>{pass.subtitle}</Text>
      </View>

      {/* Venue & Date */}
      <View style={styles.ticketMeta}>
        <Text style={[styles.venueText, { color: pass.textColor, opacity: 0.8 }]}>{pass.venue}</Text>
        <Text style={[styles.venueText, { color: pass.textColor, opacity: 0.8 }]}>{pass.date}</Text>
      </View>

      {/* Seat Info */}
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoLabel, { color: pass.textColor, opacity: 0.55 }]}>SECTION</Text>
          <Text style={[styles.infoValue, { color: pass.textColor }]}>{pass.section}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoLabel, { color: pass.textColor, opacity: 0.55 }]}>ROW</Text>
          <Text style={[styles.infoValue, { color: pass.textColor }]}>{pass.row}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoLabel, { color: pass.textColor, opacity: 0.55 }]}>SEAT</Text>
          <Text style={[styles.infoValue, { color: pass.textColor }]}>{pass.seatNum}</Text>
        </View>
      </View>

      <TearLine textColor={pass.textColor} />

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <QRCode size={110} />
      </View>
    </LinearGradient>
  );
}

function LoyaltyCard({ pass }: { pass: PassType }) {
  return (
    <LinearGradient
      colors={pass.backgroundColor as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.passCard}
    >
      <View style={styles.loyaltyHeader}>
        <Text style={[styles.loyaltyBrand, { color: pass.textColor }]}>{pass.title}</Text>
        <Text style={[styles.loyaltyType, { color: pass.textColor, opacity: 0.65 }]}>
          {pass.subtitle.toUpperCase()}
        </Text>
      </View>

      <View style={styles.loyaltyPoints}>
        <Text style={styles.starEmoji}>★</Text>
        <Text style={[styles.pointsText, { color: pass.textColor }]}>{pass.points}</Text>
      </View>

      {/* Barcode */}
      <View style={styles.barcodeContainer}>
        <Barcode dark="#FFFFFF" />
      </View>
    </LinearGradient>
  );
}

export default function PassCard({ pass }: { pass: PassType }) {
  if (pass.type === 'boarding') return <BoardingPass pass={pass} />;
  if (pass.type === 'ticket') return <EventTicket pass={pass} />;
  return <LoyaltyCard pass={pass} />;
}

const styles = StyleSheet.create({
  passCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    overflow: 'hidden',
  },
  boardingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  flightNum: {
    fontSize: 14,
    fontWeight: '500',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeCity: {
    alignItems: 'flex-start',
    flex: 1,
  },
  airportCode: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
    lineHeight: 38,
  },
  cityName: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  routeArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  routeLine: {
    height: 1,
    flex: 1,
  },
  planeIcon: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 28,
    marginBottom: 12,
  },
  infoBlock: {
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  passengerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  passengerName: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  cabinClass: {
    fontSize: 12,
    fontWeight: '400',
  },
  tearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    marginHorizontal: -20,
  },
  tearNotch: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  tearDashes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tearDash: {
    width: 4,
    height: 1.5,
    borderRadius: 1,
  },
  barcodeContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  ticketHeader: {
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  eventSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  ticketMeta: {
    marginBottom: 16,
    gap: 3,
  },
  venueText: {
    fontSize: 13,
    fontWeight: '400',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  loyaltyHeader: {
    marginBottom: 16,
  },
  loyaltyBrand: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  loyaltyType: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginTop: 2,
  },
  loyaltyPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starEmoji: {
    fontSize: 22,
    color: '#FFD700',
  },
  pointsText: {
    fontSize: 22,
    fontWeight: '600',
  },
});
